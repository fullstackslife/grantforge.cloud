'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GrantCard } from '@/components/GrantCard';
import { seedGrants } from '@/lib/seedGrants';
import { userManager } from '@/lib/userManager';
import { Grant } from '@/lib/types';

export default function SavedGrantsPage() {
  const [savedGrants, setSavedGrants] = useState<Grant[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    // Get current user's saved grants
    const currentUser = userManager.getCurrentUser();
    if (currentUser) {
      const savedGrantIds = userManager.getUserSavedGrants(currentUser.id);
      const grants = seedGrants.filter(grant => 
        savedGrantIds.some(saved => saved.grantId === grant.id)
      );
      setSavedGrants(grants);
    }
    setLoading(false);
  }, []);

  const handleRemoveFromSaved = (grantId: string) => {
    // Remove from saved grants
    const currentUser = userManager.getCurrentUser();
    if (currentUser) {
      // For now, we'll just filter it out from the display
      // In a real app, you'd want to actually remove it from storage
      setSavedGrants(prev => prev.filter(grant => grant.id !== grantId));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Saved Grants</h1>
          <p className="text-lg text-gray-600">
            Keep track of grants you're interested in applying for
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-lg font-semibold text-gray-900">
              {savedGrants.length} saved grant{savedGrants.length !== 1 ? 's' : ''}
            </h2>
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"/>
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {savedGrants.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">💾</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No saved grants yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start browsing grants and save the ones you're interested in to keep track of them here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/grants"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Grants
              </Link>
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        ) : (
          /* Saved Grants Grid/List */
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }>
            {savedGrants.map((grant: Grant) => (
              <GrantCard key={grant.id} grant={grant} viewMode={viewMode} />
            ))}
          </div>
        )}

        {/* Quick Actions */}
        {savedGrants.length > 0 && (
          <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/write"
                className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-center"
              >
                <div className="text-2xl mb-2">✍️</div>
                <div className="font-medium text-green-800">Write Proposal</div>
                <div className="text-sm text-green-600">Generate a proposal for one of your saved grants</div>
              </Link>
              <Link
                href="/grants"
                className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-center"
              >
                <div className="text-2xl mb-2">🔍</div>
                <div className="font-medium text-blue-800">Find More Grants</div>
                <div className="text-sm text-blue-600">Discover additional grant opportunities</div>
              </Link>
              <Link
                href="/dashboard"
                className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors text-center"
              >
                <div className="text-2xl mb-2">📊</div>
                <div className="font-medium text-purple-800">View Dashboard</div>
                <div className="text-sm text-purple-600">See your overall grant activity</div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 