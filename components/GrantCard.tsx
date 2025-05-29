import { Grant } from '@/lib/seedGrants';
import Link from 'next/link';

interface GrantCardProps {
  grant: Grant;
}

export default function GrantCard({ grant }: GrantCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {grant.grant_name}
      </h3>
      
      <div className="space-y-2 mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Provider:</span> {grant.provider}
        </p>
        
        <p className="text-sm text-gray-600">
          <span className="font-medium">Amount:</span> {grant.amount}
        </p>
        
        <p className="text-sm text-gray-600">
          <span className="font-medium">Deadline:</span> {grant.deadline}
        </p>
      </div>

      <p className="text-gray-700 mb-4 text-sm">
        {grant.use_case}
      </p>

      <Link 
        href={grant.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
      >
        Learn More
      </Link>
    </div>
  );
} 