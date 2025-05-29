'use client';

import { useState } from 'react';
import { Grant } from '../../lib/seedGrants';

interface SavedGrant extends Grant {
  status: 'draft' | 'submitted' | 'awarded' | 'rejected';
  notes: string;
  savedAt: string;
}

export default function DashboardPage() {
  // Mock data - in a real app, this would come from a database
  const [savedGrants, setSavedGrants] = useState<SavedGrant[]>([
    {
      id: 'verizon-resilience-2025',
      name: 'Verizon Disaster Resilience Prize 2025',
      description: 'Tech solutions enhancing U.S. disaster resilience.',
      amount: '$250,000',
      deadline: 'June 13, 2025',
      requirements: [
        'Must be registered in contiguous U.S.',
        'Minimum 4 full-time employees',
        'Technology-driven solution beyond prototype stage'
      ],
      link: 'https://solve.mit.edu/verizon-disaster-resilience-prize-2025',
      category: 'tech',
      region: 'usa',
      status: 'draft',
      notes: 'Need to complete team section',
      savedAt: '2025-05-29'
    }
  ]);

  const getStatusColor = (status: SavedGrant['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'awarded':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Grant Applications</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Grant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deadline
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Notes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {savedGrants.map((grant) => (
              <tr key={grant.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{grant.name}</div>
                  <div className="text-sm text-gray-500">{grant.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {grant.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {grant.deadline}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(grant.status)}`}>
                    {grant.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {grant.notes}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <a
                    href={grant.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    View
                  </a>
                  <button
                    onClick={() => {/* TODO: Implement edit functionality */}}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {savedGrants.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No saved grants yet. Start by browsing available grants.</p>
          <a
            href="/grants"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Browse Grants
          </a>
        </div>
      )}
    </div>
  );
} 