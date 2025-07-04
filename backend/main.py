from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import rss

app = FastAPI(title="Government Opportunity Tracker", version="1.0.0")

# Configure CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://your-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include RSS routes
app.include_router(rss.router, prefix="/api/rss", tags=["RSS Feeds"])

@app.get("/")
async def root():
    return {"message": "Government Opportunity Tracker API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"} 