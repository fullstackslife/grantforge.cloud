'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link 
              href="/" 
              className="flex items-center px-2 py-2 text-gray-900 hover:text-gray-600"
            >
              GrantForge
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <Link
              href="/write"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/write')
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Write
            </Link>
            <Link
              href="/grants"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/grants')
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Discover
            </Link>
            <Link
              href="/pricing"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/pricing')
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Pricing
            </Link>
            <Link
              href="/account"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/account')
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Account
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 