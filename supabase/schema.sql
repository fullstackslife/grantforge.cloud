-- Government Opportunity Tracker Schema
-- Run this in your Supabase SQL editor

-- Create opportunities table
CREATE TABLE IF NOT EXISTS opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    link TEXT NOT NULL,
    published TIMESTAMP WITH TIME ZONE NOT NULL,
    summary TEXT,
    source TEXT NOT NULL,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    
    -- Deduplication constraint
    UNIQUE(title, published)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_opportunities_published ON opportunities(published DESC);
CREATE INDEX IF NOT EXISTS idx_opportunities_source ON opportunities(source);
CREATE INDEX IF NOT EXISTS idx_opportunities_inserted_at ON opportunities(inserted_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust based on your needs)
CREATE POLICY "Allow all operations" ON opportunities
    FOR ALL USING (true);

-- Optional: Create a view for recent opportunities
CREATE OR REPLACE VIEW recent_opportunities AS
SELECT 
    id,
    title,
    link,
    published,
    summary,
    source,
    inserted_at
FROM opportunities
ORDER BY published DESC
LIMIT 100;

-- Optional: Create a function to get opportunities by source
CREATE OR REPLACE FUNCTION get_opportunities_by_source(source_filter TEXT, limit_count INTEGER DEFAULT 25)
RETURNS TABLE (
    id UUID,
    title TEXT,
    link TEXT,
    published TIMESTAMP WITH TIME ZONE,
    summary TEXT,
    source TEXT,
    inserted_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        o.id,
        o.title,
        o.link,
        o.published,
        o.summary,
        o.source,
        o.inserted_at
    FROM opportunities o
    WHERE o.source = source_filter
    ORDER BY o.published DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql; 