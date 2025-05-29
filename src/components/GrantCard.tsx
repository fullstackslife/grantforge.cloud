import React from 'react';
import { Grant } from '../data/seedGrants';
import Link from 'next/link';

interface GrantCardProps {
  grant: Grant;
}

export default function GrantCard({ grant }: GrantCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{grant.title}</h3>
      
      <p className="text-gray-600 mb-4">{grant.description}</p>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <span className="font-medium mr-2">Amount:</span>
          <span>{grant.amount}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <span className="font-medium mr-2">Deadline:</span>
          <span>{grant.deadline}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Eligibility:</h4>
        <div className="flex flex-wrap gap-2">
          {grant.eligibility.businessType.map((type) => (
            <span key={type} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              {type}
            </span>
          ))}
          {grant.eligibility.location.map((loc) => (
            <span key={loc} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
              {loc}
            </span>
          ))}
          {grant.eligibility.other?.map((req) => (
            <span key={req} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
              {req}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Categories:</h4>
        <div className="flex flex-wrap gap-2">
          {grant.category.map((cat) => (
            <span key={cat} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
              {cat}
            </span>
          ))}
        </div>
      </div>
      
      <Link 
        href={grant.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
      >
        Learn More
      </Link>
    </div>
  );
} 