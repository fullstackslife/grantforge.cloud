'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import EnvironmentCheck from '../components/EnvironmentCheck'

interface Opportunity {
  id: string
  title: string
  link: string
  published: string
  summary: string
  source: string
  inserted_at: string
}

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedSource, setSelectedSource] = useState<string>('all')

  useEffect(() => {
    fetchOpportunities()
  }, [selectedSource])

  const fetchOpportunities = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedSource !== 'all') {
        params.append('source', selectedSource)
      }
      
      const response = await fetch(`/api/opportunities?${params.toString()}`)
      const result = await response.json()
      
      if (result.error) {
        setError(result.error)
      } else {
        setOpportunities(result.data || [])
      }
    } catch (err) {
      setError('Failed to fetch opportunities. Please check your Supabase configuration.')
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'grants':
        return 'bg-green-100 text-green-800'
      case 'jobs':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-6 mb-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Government Opportunities
          </h1>
          <p className="text-gray-600">
            Latest grants, contracts, and job opportunities from government sources
          </p>
        </div>

        {/* Environment Check */}
        <EnvironmentCheck />

        {/* Filter Controls */}
        <div className="mb-6 flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Filter by:</label>
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Sources</option>
              <option value="grants">Grants</option>
              <option value="jobs">Jobs</option>
            </select>
          </div>
          
          <button
            onClick={fetchOpportunities}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
          >
            Refresh
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <p className="text-red-800">{error}</p>
            {error.includes('Supabase') && (
              <div className="mt-2 text-sm text-red-700">
                <p>To fix this:</p>
                <ol className="list-decimal list-inside mt-1 space-y-1">
                  <li>Create a Supabase project at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline">supabase.com</a></li>
                  <li>Run the schema from <code className="bg-red-100 px-1 rounded">supabase/schema.sql</code></li>
                  <li>Add your Supabase URL and keys to <code className="bg-red-100 px-1 rounded">.env.local</code></li>
                </ol>
              </div>
            )}
          </div>
        )}

        {/* Opportunities List */}
        <div className="space-y-4">
          {opportunities.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-500">No opportunities found</p>
            </div>
          ) : (
            opportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSourceColor(opportunity.source)}`}>
                        {opportunity.source.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatDate(opportunity.published)}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      <a
                        href={opportunity.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition-colors"
                      >
                        {opportunity.title}
                      </a>
                    </h3>
                    
                    {opportunity.summary && (
                      <p className="text-gray-700 leading-relaxed">
                        {opportunity.summary.length > 300
                          ? `${opportunity.summary.substring(0, 300)}...`
                          : opportunity.summary}
                      </p>
                    )}
                  </div>
                  
                  <a
                    href={opportunity.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View →
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Data sourced from Grants.gov and USAJobs.gov
          </p>
        </div>
      </div>
    </div>
  )
} 