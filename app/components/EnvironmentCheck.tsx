'use client'

import { useState, useEffect } from 'react'

interface EnvironmentStatus {
  supabaseUrl: boolean
  supabaseKey: boolean
  apiAccessible: boolean
}

export default function EnvironmentCheck() {
  const [status, setStatus] = useState<EnvironmentStatus>({
    supabaseUrl: false,
    supabaseKey: false,
    apiAccessible: false
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkEnvironment()
  }, [])

  const checkEnvironment = async () => {
    setLoading(true)
    
    // Check environment variables (only what's publicly accessible)
    const supabaseUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    // Test API accessibility
    let apiAccessible = false
    try {
      const response = await fetch('/api/opportunities?limit=1')
      apiAccessible = response.ok
    } catch (error) {
      apiAccessible = false
    }

    setStatus({
      supabaseUrl,
      supabaseKey,
      apiAccessible
    })
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
        <p className="text-blue-800">Checking environment configuration...</p>
      </div>
    )
  }

  const allGood = status.supabaseUrl && status.supabaseKey && status.apiAccessible

  if (allGood) {
    return null // Don't show anything if everything is working
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
      <h3 className="text-yellow-800 font-semibold mb-2">Configuration Issues Detected</h3>
      
      <div className="space-y-2 text-sm text-yellow-700">
        {!status.supabaseUrl && (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            <span>NEXT_PUBLIC_SUPABASE_URL is not configured</span>
          </div>
        )}
        
        {!status.supabaseKey && (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            <span>NEXT_PUBLIC_SUPABASE_ANON_KEY is not configured</span>
          </div>
        )}
        
        {status.supabaseUrl && status.supabaseKey && !status.apiAccessible && (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
            <span>API is not accessible - check your Supabase configuration</span>
          </div>
        )}
      </div>

      <div className="mt-4 text-sm">
        <p className="font-medium mb-2">To fix this:</p>
        <ol className="list-decimal list-inside space-y-1 text-yellow-700">
          <li>Create a <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline">Supabase project</a></li>
          <li>Run the schema from <code className="bg-yellow-100 px-1 rounded">supabase/schema.sql</code></li>
          <li>Add your credentials to <code className="bg-yellow-100 px-1 rounded">.env.local</code>:</li>
        </ol>
        <pre className="mt-2 bg-gray-100 p-3 rounded text-xs overflow-x-auto">
{`NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key`}
        </pre>
      </div>
    </div>
  )
} 