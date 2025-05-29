import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to GrantForge.cloud
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find and apply for grants with AI-powered assistance
          </p>
          <Link
            href="/grants"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Browse Available Grants
          </Link>
        </div>
      </main>
    </div>
  );
} 