#!/bin/bash

echo "🚀 Setting up Government Opportunity Tracker..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed."
    exit 1
fi

echo "✅ Python and Node.js found"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
source venv/bin/activate
pip install -r requirements.txt
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Create environment files if they don't exist
echo "📝 Setting up environment files..."

if [ ! -f "backend/.env" ]; then
    echo "Creating backend/.env from template..."
    cp backend/env.example backend/.env
    echo "⚠️  Please edit backend/.env with your Supabase credentials"
fi

if [ ! -f ".env.local" ]; then
    echo "Creating .env.local from template..."
    cp env.local.example .env.local
    echo "⚠️  Please edit .env.local with your Supabase credentials"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit backend/.env with your Supabase URL and service key"
echo "2. Edit .env.local with your Supabase URL and anon key"
echo "3. Run the Supabase schema: supabase/schema.sql"
echo "4. Start the backend: cd backend && python run.py"
echo "5. Start the frontend: npm run dev"
echo "6. Visit http://localhost:3000/opportunities"
echo ""
echo "📚 See README_OPPORTUNITIES.md for detailed documentation" 