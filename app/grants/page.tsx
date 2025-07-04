'use client';

import { useState, useEffect } from 'react';
import { GrantCard } from '@/components/GrantCard';
import { GrantSearchForm } from '@/components/GrantSearchForm';
import { seedGrants } from '@/lib/seedGrants';
import { SearchFilters, Grant } from '@/lib/types';

type SortOption = 'deadline' | 'amount' | 'name' | 'relevance';

export default function GrantsPage() {
  const [filteredGrants, setFilteredGrants] = useState(seedGrants);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleSearch = (filters: SearchFilters) => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const filtered = seedGrants.filter((grant: Grant) => {
        // Region filter
        if (filters.region && grant.region !== filters.region) return false;
        
        // Industry filter
        if (filters.industry && !grant.industries.includes(filters.industry)) return false;
        
        // Amount filter
        if (filters.minAmount || filters.maxAmount) {
          // If we have a min amount filter, check if grant's amount is less than filter
          if (filters.minAmount && grant.amount < filters.minAmount) return false;
          
          // If we have a max amount filter, check if grant's amount is greater than filter
          if (filters.maxAmount && grant.amount > filters.maxAmount) return false;
        }
        
        return true;
      });
      setFilteredGrants(filtered);
      setIsLoading(false);
    }, 500);
  };

  const sortGrants = (grants: Grant[], sortBy: SortOption) => {
    return [...grants].sort((a, b) => {
      switch (sortBy) {
        case 'deadline':
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        case 'amount':
          return b.amount - a.amount; // Highest first
        case 'name':
          return a.name.localeCompare(b.name);
        case 'relevance':
        default:
          return 0; // Keep original order
      }
    });
  };

  const sortedGrants = sortGrants(filteredGrants, sortBy);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Grant Discovery</h1>
          <p className="text-lg text-gray-600">
            Find the perfect grants for your project from our curated database
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-100">
          <GrantSearchForm onSearch={handleSearch} />
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-lg font-semibold text-gray-900">
              {isLoading ? 'Searching...' : `${sortedGrants.length} grants found`}
            </h2>
            {!isLoading && sortedGrants.length > 0 && (
              <p className="text-sm text-gray-600 mt-1">
                Showing grants sorted by {sortBy === 'relevance' ? 'relevance' : sortBy}
              </p>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Sort */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="relevance">Relevance</option>
                <option value="deadline">Deadline</option>
                <option value="amount">Amount (High to Low)</option>
                <option value="name">Name</option>
              </select>
            </div>

            {/* View Toggle */}
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

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Searching for grants...</p>
            </div>
          </div>
        ) : sortedGrants.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No grants found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Try adjusting your search criteria or browse all available grants
            </p>
            <button
              onClick={() => {
                setFilteredGrants(seedGrants);
                setSortBy('relevance');
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Grants
            </button>
          </div>
        ) : (
          /* Results Grid/List */
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }>
            {sortedGrants.map((grant: Grant) => (
              <GrantCard key={grant.id} grant={grant} viewMode={viewMode} />
            ))}
          </div>
        )}

        {/* Load More (if needed) */}
        {!isLoading && sortedGrants.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Showing {sortedGrants.length} of {seedGrants.length} grants
            </p>
            {sortedGrants.length < seedGrants.length && (
              <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Load More Grants
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 