#!/usr/bin/env python3
"""
Test script to verify Government Opportunity Tracker setup
Run with: python test_setup.py
"""

import os
import sys
import requests
from dotenv import load_dotenv

def test_environment():
    """Test environment variables"""
    print("🔍 Testing environment variables...")
    
    required_vars = [
        "SUPABASE_URL",
        "SUPABASE_SERVICE_KEY"
    ]
    
    missing_vars = []
    for var in required_vars:
        if not os.getenv(var):
            missing_vars.append(var)
    
    if missing_vars:
        print(f"❌ Missing environment variables: {', '.join(missing_vars)}")
        return False
    
    print("✅ Environment variables configured")
    return True

def test_dependencies():
    """Test Python dependencies"""
    print("🔍 Testing Python dependencies...")
    
    try:
        import fastapi
        import feedparser
        import httpx
        import supabase
        print("✅ All Python dependencies installed")
        return True
    except ImportError as e:
        print(f"❌ Missing dependency: {e}")
        return False

def test_supabase_connection():
    """Test Supabase connection"""
    print("🔍 Testing Supabase connection...")
    
    try:
        from supabase import create_client
        
        supabase_url = os.getenv("SUPABASE_URL")
        supabase_key = os.getenv("SUPABASE_SERVICE_KEY")
        
        supabase = create_client(supabase_url, supabase_key)
        
        # Test a simple query
        result = supabase.table("opportunities").select("count", count="exact").execute()
        print("✅ Supabase connection successful")
        return True
        
    except Exception as e:
        print(f"❌ Supabase connection failed: {e}")
        return False

def test_rss_feeds():
    """Test RSS feed accessibility"""
    print("🔍 Testing RSS feed accessibility...")
    
    feeds = {
        "grants": "https://www.grants.gov/rss/GGNewOpportunities.xml",
        "jobs": "https://www.usajobs.gov/Search/RSSFeed?Keywords=grants+management"
    }
    
    for name, url in feeds.items():
        try:
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                print(f"✅ {name} feed accessible")
            else:
                print(f"❌ {name} feed returned status {response.status_code}")
        except Exception as e:
            print(f"❌ {name} feed error: {e}")

def main():
    """Run all tests"""
    print("🧪 Government Opportunity Tracker - Setup Test")
    print("=" * 50)
    
    # Load environment variables
    load_dotenv("backend/.env")
    
    tests = [
        test_environment,
        test_dependencies,
        test_supabase_connection,
        test_rss_feeds
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        try:
            if test():
                passed += 1
        except Exception as e:
            print(f"❌ Test failed with exception: {e}")
        print()
    
    print("=" * 50)
    print(f"📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! Your setup is ready.")
    else:
        print("⚠️  Some tests failed. Please check the issues above.")
    
    return passed == total

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1) 