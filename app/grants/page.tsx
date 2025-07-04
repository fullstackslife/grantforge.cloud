'use client';

import { useState } from 'react';
import { GrantCard } from '@/components/GrantCard';
import { GrantSearchForm } from '@/components/GrantSearchForm';
import { seedGrants } from '@/lib/seedGrants';
import { SearchFilters, Grant } from '@/lib/types';


export default function GrantsPage() {
  const [filteredGrants, setFilteredGrants] = useState(seedGrants);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Grant Discovery</h1>
      
      <div className="mb-8">
        <GrantSearchForm onSearch={handleSearch} />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGrants.map((grant: Grant) => (
            <GrantCard key={grant.id} grant={grant} />
          ))}
        </div>
      )}
    </div>
  );
} 