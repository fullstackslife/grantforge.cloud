import { useState } from 'react';
import { SearchFilters } from '@/lib/types';

interface GrantSearchFormProps {
  onSearch: (filters: SearchFilters) => void;
}

export function GrantSearchForm({ onSearch }: GrantSearchFormProps) {
  const [filters, setFilters] = useState<SearchFilters>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
            Region
          </label>
          <select
            id="region"
            name="region"
            value={filters.region || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Regions</option>
            <option value="global">Global</option>
            <option value="usa">USA</option>
            <option value="canada">Canada</option>
            <option value="uk">UK</option>
            <option value="eu">EU</option>
          </select>
        </div>

        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
            Industry
          </label>
          <select
            id="industry"
            name="industry"
            value={filters.industry || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Industries</option>
            <option value="tech">Technology</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="environment">Environment</option>
            <option value="social">Social Impact</option>
          </select>
        </div>

        <div>
          <label htmlFor="minAmount" className="block text-sm font-medium text-gray-700 mb-1">
            Min Amount
          </label>
          <input
            type="number"
            id="minAmount"
            name="minAmount"
            value={filters.minAmount || ''}
            onChange={handleChange}
            placeholder="Min amount"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="maxAmount" className="block text-sm font-medium text-gray-700 mb-1">
            Max Amount
          </label>
          <input
            type="number"
            id="maxAmount"
            name="maxAmount"
            value={filters.maxAmount || ''}
            onChange={handleChange}
            placeholder="Max amount"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Search Grants
        </button>
      </div>
    </form>
  );
} 