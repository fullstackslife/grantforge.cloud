import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Win Grants 10x Faster with AI
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Discover, apply, and win grants for your startup or business with our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/grants"
                className="px-8 py-3 bg-white text-blue-600 rounded-md font-semibold hover:bg-blue-50 transition-colors"
              >
                Browse Grants
              </Link>
              <Link
                href="/write"
                className="px-8 py-3 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-400 transition-colors"
              >
                Write with AI
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose GrantForge?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-2xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">Smart Grant Discovery</h3>
              <p className="text-gray-600">
                Find the perfect grants for your business with our AI-powered matching system.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-2xl mb-4">✍️</div>
              <h3 className="text-xl font-semibold mb-2">AI Grant Writing</h3>
              <p className="text-gray-600">
                Generate professional grant proposals in minutes with our advanced AI writer.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-2xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Track & Manage</h3>
              <p className="text-gray-600">
                Keep track of all your grant applications and deadlines in one place.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of businesses winning grants with GrantForge.
          </p>
          <Link
            href="/grants"
            className="px-8 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors"
          >
            Start Finding Grants
          </Link>
        </div>
      </div>
    </div>
  );
} 