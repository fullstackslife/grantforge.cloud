'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { seedGrants } from '@/lib/seedGrants';
import { Grant } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { SavedGrant } from '@/lib/userManager';

export default function GrantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [grant, setGrant] = useState<Grant | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const grantId = params.id as string;
    const foundGrant = seedGrants.find(g => g.id === grantId);
    
    if (foundGrant) {
      setGrant(foundGrant);
      // Check if grant is already saved
      if (typeof window !== 'undefined') {
        const { userManager } = require('@/lib/userManager');
        const currentUser = userManager.getCurrentUser();
        if (currentUser) {
          const savedGrants = userManager.getUserSavedGrants(currentUser.id);
          setSaved(savedGrants.some((sg: SavedGrant) => sg.grantId === grantId));
        }
      }
    } else {
      router.push('/grants');
    }
    setLoading(false);
  }, [params.id, router]);

  const handleSaveGrant = async () => {
    if (!grant) return;
    
    if (typeof window !== 'undefined') {
      const { userManager } = await import('@/lib/userManager');
      const currentUser = userManager.getCurrentUser();
      if (currentUser) {
        userManager.saveGrant(currentUser.id, grant.id);
        setSaved(true);
      }
    }
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!grant) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Grant Not Found</h1>
            <p className="mt-4 text-gray-600">The grant you're looking for doesn't exist.</p>
            <Link
              href="/grants"
              className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse All Grants
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const daysUntilDeadline = getDaysUntilDeadline(grant.deadline);
  const isUrgent = daysUntilDeadline <= 7;
  const isExpired = daysUntilDeadline < 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/grants" className="hover:text-blue-600 transition-colors">
                Grants
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-900 font-medium">{grant.name}</li>
          </ol>
        </nav>

        {/* Grant Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{grant.name}</h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">{grant.description}</p>
              
              {/* Provider and Region */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {grant.provider}
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {grant.region}
                </div>
              </div>
            </div>

            {/* Amount Badge */}
            <div className="lg:ml-6 mb-6 lg:mb-0">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-xl text-center">
                <div className="text-2xl font-bold">{formatCurrency(grant.amount)}</div>
                <div className="text-sm opacity-90">Available Funding</div>
              </div>
            </div>
          </div>

          {/* Deadline Alert */}
          <div className={`p-4 rounded-xl border ${
            isExpired 
              ? 'bg-red-50 border-red-200 text-red-800' 
              : isUrgent 
                ? 'bg-orange-50 border-orange-200 text-orange-800'
                : 'bg-blue-50 border-blue-200 text-blue-800'
          }`}>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <div className="font-semibold">
                  {isExpired ? 'Application Closed' : 'Application Deadline'}
                </div>
                <div className="text-sm opacity-90">
                  {isExpired 
                    ? `Closed on ${new Date(grant.deadline).toLocaleDateString()}`
                    : `${new Date(grant.deadline).toLocaleDateString()} (${daysUntilDeadline} days remaining)`
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Requirements */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Requirements</h2>
              <ul className="space-y-3">
                {grant.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Target Industries</h2>
              <div className="flex flex-wrap gap-3">
                {grant.industries.map((industry) => (
                  <span
                    key={industry}
                    className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>

            {/* Tags */}
            {grant.tags && grant.tags.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {grant.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Buttons */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Take Action</h3>
              <div className="space-y-3">
                <a
                  href={grant.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full px-4 py-3 text-center font-medium rounded-lg transition-colors ${
                    isExpired
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isExpired ? 'Application Closed' : 'Apply Now'}
                </a>
                <button
                  onClick={handleSaveGrant}
                  disabled={saved}
                  className={`w-full px-4 py-3 font-medium rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                    saved
                      ? 'bg-green-100 text-green-800 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {saved ? (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Saved</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                      <span>Save Grant</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-600">Amount</div>
                  <div className="text-lg font-semibold text-gray-900">{formatCurrency(grant.amount)}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">Region</div>
                  <div className="text-lg font-semibold text-gray-900">{grant.region}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">Deadline</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {new Date(grant.deadline).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">Provider</div>
                  <div className="text-lg font-semibold text-gray-900">{grant.provider}</div>
                </div>
              </div>
            </div>

            {/* Related Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/write"
                  className="block w-full px-4 py-3 text-center bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  Write Proposal
                </Link>
                <Link
                  href="/grants"
                  className="block w-full px-4 py-3 text-center bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Browse More Grants
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 