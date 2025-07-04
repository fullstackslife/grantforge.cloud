# Government Opportunity Tracker

A full-stack application that automatically fetches and displays government grants, contracts, and job opportunities from RSS feeds.

## 🏗️ Architecture

- **Backend**: FastAPI with RSS feed processing and Supabase integration
- **Frontend**: Next.js with Tailwind CSS for modern UI
- **Database**: Supabase PostgreSQL with automatic deduplication
- **Optional**: Discord webhook notifications for new opportunities

## 📁 Project Structure

```
GrantForge/
├── backend/                    # FastAPI backend
│   ├── main.py                # FastAPI app entry point
│   ├── routes/
│   │   ├── __init__.py
│   │   └── rss.py            # RSS feed processing routes
│   ├── requirements.txt       # Python dependencies
│   ├── run.py                # Server startup script
│   └── env.example           # Backend environment template
├── app/                       # Next.js frontend (App Router)
│   ├── api/opportunities/
│   │   └── route.ts          # API route for fetching opportunities
│   └── opportunities/
│       └── page.tsx          # Opportunities display page
├── supabase/
│   └── schema.sql            # Database schema
└── env.local.example         # Frontend environment template
```

## 🚀 Quick Start

### 1. Set up Supabase

1. Create a new Supabase project
2. Run the schema in `supabase/schema.sql` in your Supabase SQL editor
3. Get your project URL and API keys

### 2. Configure Environment Variables

**Backend** (`backend/env.example` → `backend/.env`):
```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/your-webhook-url
```

**Frontend** (`env.local.example` → `.env.local`):
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Install Dependencies

**Backend**:
```bash
cd backend
pip install -r requirements.txt
```

**Frontend** (already installed in existing project):
```bash
npm install @supabase/supabase-js
```

### 4. Run the Application

**Backend**:
```bash
cd backend
python run.py
```
Server will start at `http://localhost:8000`

**Frontend**:
```bash
npm run dev
```
Frontend will start at `http://localhost:3000`

### 5. Access the Application

- **Frontend**: Visit `http://localhost:3000/opportunities`
- **Backend API**: Visit `http://localhost:8000/docs` for API documentation

## 🔧 API Endpoints

### Backend (FastAPI)

- `GET /api/rss/fetch` - Fetch and store RSS feeds
- `GET /api/rss/opportunities` - Get opportunities from database
- `GET /api/rss/sources` - Get available feed sources

### Frontend (Next.js)

- `GET /api/opportunities` - Get opportunities with filtering

## 📊 Data Sources

Currently configured RSS feeds:

- **Grants.gov**: `https://www.grants.gov/rss/GGNewOpportunities.xml`
- **USAJobs.gov**: `https://www.usajobs.gov/Search/RSSFeed?Keywords=grants+management`

## 🔄 Automation

To automatically fetch feeds, you can:

1. **Use a cron job**:
```bash
# Add to crontab - runs every hour
0 * * * * curl http://localhost:8000/api/rss/fetch
```

2. **Use a service like GitHub Actions**:
```yaml
name: Fetch Opportunities
on:
  schedule:
    - cron: '0 * * * *'  # Every hour
  workflow_dispatch:

jobs:
  fetch:
    runs-on: ubuntu-latest
    steps:
      - name: Fetch RSS feeds
        run: curl ${{ secrets.API_URL }}/api/rss/fetch
```

## 🎨 Features

- **Real-time RSS Processing**: Automatically fetches and normalizes feed data
- **Deduplication**: Prevents duplicate entries based on title + published date
- **Source Filtering**: Filter opportunities by source (grants, jobs)
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Discord Integration**: Optional webhook notifications for new opportunities
- **Error Handling**: Robust error handling and logging

## 🔧 Customization

### Adding New RSS Feeds

Edit `backend/routes/rss.py` and add to `FEED_SOURCES`:

```python
FEED_SOURCES = {
    "grants": "https://www.grants.gov/rss/GGNewOpportunities.xml",
    "jobs": "https://www.usajobs.gov/Search/RSSFeed?Keywords=grants+management",
    "contracts": "https://your-new-feed-url.xml",  # Add new feeds here
}
```

### Modifying the UI

The frontend uses Tailwind CSS and is fully customizable. Key files:
- `app/opportunities/page.tsx` - Main opportunities page
- `app/api/opportunities/route.ts` - API route for data fetching

### Database Schema

The schema in `supabase/schema.sql` includes:
- Automatic deduplication
- Performance indexes
- Row Level Security (RLS)
- Helper views and functions

## 🚨 Troubleshooting

### Common Issues

1. **Import errors**: Make sure all Python dependencies are installed
2. **Database connection**: Verify Supabase credentials in environment variables
3. **CORS errors**: Check that frontend URL is in backend CORS configuration
4. **Feed parsing errors**: Some RSS feeds may have malformed XML

### Debug Mode

Enable debug logging by setting environment variable:
```bash
export LOG_LEVEL=debug
```

## 📈 Monitoring

The application includes:
- Health check endpoint: `GET /health`
- Error logging for feed processing
- Database query performance monitoring
- API response time tracking

## 🔒 Security

- Environment variables for sensitive data
- Row Level Security (RLS) in Supabase
- CORS configuration for frontend-backend communication
- Input validation and sanitization

## 📝 License

This project is part of GrantForge and follows the same license terms. 