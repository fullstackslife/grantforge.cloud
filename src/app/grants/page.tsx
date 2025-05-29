'use client';

import React, { useState, useMemo } from 'react';
import { grants } from '@/data/seedGrants';
import GrantCard from '@/components/GrantCard';

export default function GrantsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  // Get unique categories and regions for filters
  const categories = useMemo(() => {
    const allCategories = grants.flatMap(grant => grant.category);
    return [...new Set(allCategories)];
  }, []);

  const regions = useMemo(() => {
    const allRegions = grants.flatMap(grant => grant.eligibility.location);
    return [...new Set(allRegions)];
  }, []);

  // Filter grants based on search term and selected filters
  const filteredGrants = useMemo(() => {
    return grants.filter(grant => {
      const matchesSearch = 
        grant.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grant.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === '' || 
        grant.category.includes(selectedCategory);
      
      const matchesRegion = 
        selectedRegion === '' || 
        grant.eligibility.location.includes(selectedRegion);

      return matchesSearch && matchesCategory && matchesRegion;
    });
  }, [searchTerm, selectedCategory, selectedRegion]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Grants</h1>
      
      {/* Search and Filter UI */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search grants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Category Filter */}
          <div className="w-full md:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          {/* Region Filter */}
          <div className="w-full md:w-48">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Regions</option>
              {regions.map(region => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredGrants.length} of {grants.length} grants
        </p>
      </div>
      
      {/* Grants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGrants.map(grant => (
          <GrantCard key={grant.id} grant={grant} />
        ))}
      </div>
      
      {/* No Results Message */}
      {filteredGrants.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No grants found matching your criteria. Try adjusting your filters.
          </p>
        </div>
      )}
    </div>
  );
} 