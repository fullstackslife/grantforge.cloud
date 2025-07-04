from fastapi import APIRouter, HTTPException
from datetime import datetime
import feedparser
import httpx
import os
from typing import List, Dict, Any
from supabase import create_client, Client

router = APIRouter()

# Initialize Supabase client
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")
DISCORD_WEBHOOK_URL = os.getenv("DISCORD_WEBHOOK_URL")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("SUPABASE_URL and SUPABASE_SERVICE_KEY must be set")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Feed sources configuration
FEED_SOURCES = {
    "grants": "https://www.grants.gov/rss/GGNewOpportunities.xml",
    "jobs": "https://www.usajobs.gov/Search/RSSFeed?Keywords=grants+management&Location=",
}

def normalize_feed_entry(entry: Any, source: str) -> Dict[str, Any]:
    """Normalize RSS feed entry into consistent format"""
    try:
        # Parse published date
        if hasattr(entry, 'published_parsed') and entry.published_parsed:
            published = datetime(*entry.published_parsed[:6])
        else:
            published = datetime.utcnow()
        
        return {
            "source": source,
            "title": entry.title.strip() if entry.title else "",
            "link": entry.link.strip() if entry.link else "",
            "published": published.isoformat(),
            "summary": (entry.get("summary", "")[:1000] if entry.get("summary") else "")
        }
    except Exception as e:
        print(f"Error normalizing entry: {e}")
        return None

def send_discord_notification(item: Dict[str, Any]) -> None:
    """Send notification to Discord webhook"""
    if not DISCORD_WEBHOOK_URL:
        return
    
    try:
        content = f"📢 **{item['title']}**\n🔗 {item['link']}\n🕒 {item['published']}\n📋 {item['summary'][:200]}..."
        payload = {"content": content}
        
        httpx.post(DISCORD_WEBHOOK_URL, json=payload, timeout=10.0)
    except Exception as e:
        print(f"Discord notification failed: {e}")

@router.get("/fetch")
async def fetch_and_store_feeds():
    """Fetch all RSS feeds and store in Supabase"""
    inserted_count = 0
    errors = []
    
    for source, url in FEED_SOURCES.items():
        try:
            # Parse RSS feed
            feed = feedparser.parse(url)
            
            if feed.bozo:
                errors.append(f"Feed parsing error for {source}: {feed.bozo_exception}")
                continue
            
            # Process each entry
            for entry in feed.entries:
                normalized_item = normalize_feed_entry(entry, source)
                if not normalized_item:
                    continue
                
                try:
                    # Insert into Supabase with deduplication
                    result = supabase.table("opportunities").upsert(
                        normalized_item,
                        on_conflict="title,published"
                    ).execute()
                    
                    if result.data:
                        inserted_count += 1
                        # Send Discord notification for new entries
                        send_discord_notification(normalized_item)
                        
                except Exception as e:
                    errors.append(f"Database error for {source}: {e}")
                    
        except Exception as e:
            errors.append(f"Feed fetch error for {source}: {e}")
    
    return {
        "inserted": inserted_count,
        "errors": errors,
        "timestamp": datetime.utcnow().isoformat()
    }

@router.get("/opportunities")
async def get_opportunities(limit: int = 25, source: str = None):
    """Get opportunities from Supabase"""
    try:
        query = supabase.table("opportunities").select("*").order("published", desc=True)
        
        if source:
            query = query.eq("source", source)
        
        result = query.limit(limit).execute()
        
        return {
            "data": result.data,
            "count": len(result.data)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

@router.get("/sources")
async def get_sources():
    """Get available feed sources"""
    return {
        "sources": list(FEED_SOURCES.keys()),
        "feeds": FEED_SOURCES
    } 