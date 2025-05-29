import { useState } from 'react';
import { grants } from '@/lib/seedGrants';
import GrantCard from '@/components/GrantCard';

export default function GrantsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');

  // Get unique providers for filter
  const providers = Array.from(new Set(grants.map(grant => grant.provider)));

  // Filter grants based on search term and provider
  const filteredGrants = grants.filter(grant => {
    const matchesSearch = grant.grant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grant.use_case.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProvider = !selectedProvider || grant.provider === selectedProvider;
    return matchesSearch && matchesProvider;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Available Grants
          </h1>
          <p className="text-gray-600">
            Discover and apply for grants that match your business needs
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search grants..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
          >
            <option value="">All Providers</option>
            {providers.map(provider => (
              <option key={provider} value={provider}>
                {provider}
              </option>
            ))}
          </select>
        </div>

        {/* Grants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGrants.map((grant, index) => (
            <GrantCard key={index} grant={grant} />
          ))}
        </div>

        {/* No Results Message */}
        {filteredGrants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              No grants found matching your criteria. Try adjusting your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 