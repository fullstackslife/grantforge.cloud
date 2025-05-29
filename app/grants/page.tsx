'use client';

import { useState } from 'react';
import { grants, Grant } from '../../lib/seedGrants';
import GrantCard from '../../components/GrantCard';

export default function GrantsPage() {
  const [filters, setFilters] = useState({
    category: '',
    region: '',
    search: ''
  });

  const filteredGrants = grants.filter((grant: Grant) => {
    const matchesCategory = !filters.category || grant.category === filters.category;
    const matchesRegion = !filters.region || grant.region === filters.region;
    const matchesSearch = !filters.search || 
      grant.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      grant.description.toLowerCase().includes(filters.search.toLowerCase());

    return matchesCategory && matchesRegion && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Grants</h1>

      {/* Filters */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search grants..."
          className="px-4 py-2 border rounded-md"
          value={filters.search}
          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
        />

        <select
          className="px-4 py-2 border rounded-md"
          value={filters.category}
          onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
        >
          <option value="">All Categories</option>
          <option value="tech">Technology</option>
          <option value="business">Business</option>
          <option value="social">Social Impact</option>
          <option value="research">Research</option>
        </select>

        <select
          className="px-4 py-2 border rounded-md"
          value={filters.region}
          onChange={(e) => setFilters(prev => ({ ...prev, region: e.target.value }))}
        >
          <option value="">All Regions</option>
          <option value="global">Global</option>
          <option value="usa">USA</option>
          <option value="canada">Canada</option>
          <option value="uk">UK</option>
          <option value="eu">EU</option>
        </select>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGrants.map((grant: Grant) => (
          <GrantCard key={grant.id} grant={grant} />
        ))}
      </div>

      {filteredGrants.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No grants found matching your criteria.</p>
        </div>
      )}
    </div>
  );
} 