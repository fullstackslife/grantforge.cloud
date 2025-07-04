'use client';

import { useState, useEffect } from 'react';
import { AccountSummary } from '../components/AccountSummary';
import { PlanInfo } from '../components/PlanInfo';
import { userManager, User } from '@/lib/userManager';

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Clear any existing user data to ensure fresh demo user
    userManager.clearAllData();
    
    // Initialize demo user
    const currentUser = userManager.initializeDemoUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">No User Found</h1>
              <p className="mt-4 text-gray-600">Please log in to view your account.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          
          <div className="mt-8 space-y-8">
            <AccountSummary user={user} />
            <PlanInfo user={user} />
            
            {/* Usage Stats Section */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Usage Statistics</h2>
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="bg-gray-50 px-4 py-5 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500">Grants Saved</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">{user.usage.grantsSaved}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500">Proposals Generated</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">{user.usage.proposalsGenerated}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500">API Calls</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">{user.usage.apiCalls}</dd>
                </div>
              </dl>
            </div>

            {/* Recent Proposals Section */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Proposals</h2>
              <ProposalsList userId={user.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProposalsList({ userId }: { userId: string }) {
  const [proposals, setProposals] = useState<any[]>([]);

  useEffect(() => {
    const userProposals = userManager.getUserProposals(userId);
    setProposals(userProposals.slice(0, 5)); // Show last 5 proposals
  }, [userId]);

  if (proposals.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No proposals generated yet.</p>
        <p className="text-sm text-gray-400 mt-2">Generate your first proposal in the AI Grant Writer!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {proposals.map((proposal) => (
        <div key={proposal.id} className="border rounded-lg p-4">
          <h3 className="font-medium text-gray-900">{proposal.projectName}</h3>
          <p className="text-sm text-gray-600 mt-1">{proposal.fundingAmount}</p>
          <p className="text-xs text-gray-400 mt-2">
            Generated on {new Date(proposal.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
} 