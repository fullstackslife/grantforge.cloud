'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { userManager, User } from '@/lib/userManager';
import { seedGrants } from '@/lib/seedGrants';

interface DashboardStats {
  totalGrants: number;
  savedGrants: number;
  proposalsGenerated: number;
  successRate: number;
  upcomingDeadlines: number;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalGrants: 0,
    savedGrants: 0,
    proposalsGenerated: 0,
    successRate: 0,
    upcomingDeadlines: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize demo user if none exists
    let currentUser = userManager.getCurrentUser();
    if (!currentUser) {
      currentUser = userManager.initializeDemoUser();
    }
    setUser(currentUser);

    // Calculate dashboard stats
    const savedGrants = userManager.getUserSavedGrants(currentUser.id);
    const proposals = userManager.getUserProposals(currentUser.id);
    
    // Calculate upcoming deadlines (grants due in next 30 days)
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    
    const upcomingDeadlines = seedGrants.filter(grant => {
      const deadline = new Date(grant.deadline);
      return deadline <= thirtyDaysFromNow && deadline >= new Date();
    }).length;

    setStats({
      totalGrants: seedGrants.length,
      savedGrants: savedGrants.length,
      proposalsGenerated: proposals.length,
      successRate: proposals.length > 0 ? 85 : 0, // Demo success rate
      upcomingDeadlines,
    });

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">No User Found</h1>
            <p className="mt-4 text-gray-600">Please log in to view your dashboard.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back, {user.name}! Here's your grant activity overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Grants</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalGrants.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">💾</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Saved Grants</p>
                <p className="text-2xl font-bold text-gray-900">{stats.savedGrants}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">✍️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Proposals</p>
                <p className="text-2xl font-bold text-gray-900">{stats.proposalsGenerated}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.successRate}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⏰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Deadlines</p>
                <p className="text-2xl font-bold text-gray-900">{stats.upcomingDeadlines}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Find Grants */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-xl">🔍</span>
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">Find Grants</h3>
            </div>
            <p className="text-gray-600 mb-4">Discover new grant opportunities that match your profile.</p>
            <Link
              href="/grants"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Grants
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Write Proposal */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-xl">✍️</span>
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">Write Proposal</h3>
            </div>
            <p className="text-gray-600 mb-4">Generate a professional grant proposal with AI assistance.</p>
            <Link
              href="/write"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Start Writing
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* View Account */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-xl">👤</span>
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">Account Settings</h3>
            </div>
            <p className="text-gray-600 mb-4">Manage your profile, subscription, and preferences.</p>
            <Link
              href="/account"
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              View Account
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Proposals */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Proposals</h3>
            <RecentProposals userId={user.id} />
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
            <UpcomingDeadlines />
          </div>
        </div>
      </div>
    </div>
  );
}

function RecentProposals({ userId }: { userId: string }) {
  const [proposals, setProposals] = useState<any[]>([]);

  useEffect(() => {
    const userProposals = userManager.getUserProposals(userId);
    setProposals(userProposals.slice(0, 3)); // Show last 3 proposals
  }, [userId]);

  if (proposals.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">✍️</span>
        </div>
        <p className="text-gray-500 mb-2">No proposals yet</p>
        <p className="text-sm text-gray-400">Generate your first proposal to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {proposals.map((proposal) => (
        <div key={proposal.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-sm font-medium text-blue-600">GP</span>
          </div>
          <div className="ml-4 flex-1">
            <h4 className="font-medium text-gray-900">{proposal.projectName}</h4>
            <p className="text-sm text-gray-600">{proposal.fundingAmount}</p>
            <p className="text-xs text-gray-400">
              {new Date(proposal.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
      <Link
        href="/write"
        className="block text-center text-blue-600 hover:text-blue-700 text-sm font-medium"
      >
        View all proposals →
      </Link>
    </div>
  );
}

function UpcomingDeadlines() {
  const [upcomingGrants, setUpcomingGrants] = useState<any[]>([]);

  useEffect(() => {
    // Get grants with deadlines in the next 30 days
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    
    const upcoming = seedGrants
      .filter(grant => {
        const deadline = new Date(grant.deadline);
        return deadline <= thirtyDaysFromNow && deadline >= new Date();
      })
      .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
      .slice(0, 3);

    setUpcomingGrants(upcoming);
  }, []);

  if (upcomingGrants.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">⏰</span>
        </div>
        <p className="text-gray-500 mb-2">No upcoming deadlines</p>
        <p className="text-sm text-gray-400">All caught up for now!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {upcomingGrants.map((grant) => {
        const daysUntilDeadline = Math.ceil(
          (new Date(grant.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        );
        
        return (
          <div key={grant.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              daysUntilDeadline <= 7 ? 'bg-red-100' : 'bg-orange-100'
            }`}>
              <span className={`text-sm font-medium ${
                daysUntilDeadline <= 7 ? 'text-red-600' : 'text-orange-600'
              }`}>
                {daysUntilDeadline}d
              </span>
            </div>
            <div className="ml-4 flex-1">
              <h4 className="font-medium text-gray-900">{grant.name}</h4>
              <p className="text-sm text-gray-600">{grant.amount}</p>
              <p className="text-xs text-gray-400">
                Due: {new Date(grant.deadline).toLocaleDateString()}
              </p>
            </div>
          </div>
        );
      })}
      <Link
        href="/grants"
        className="block text-center text-blue-600 hover:text-blue-700 text-sm font-medium"
      >
        View all grants →
      </Link>
    </div>
  );
} 