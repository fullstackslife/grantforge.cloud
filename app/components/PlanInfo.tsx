import Link from 'next/link';

interface User {
  name: string;
  email: string;
  organization: string;
  plan: string;
  usage: {
    grantsSaved: number;
    proposalsGenerated: number;
    apiCalls: number;
  };
}

interface PlanInfoProps {
  user: User;
}

const planDetails = {
  free: {
    name: 'Free',
    price: '$0',
    features: ['Basic grant matching', 'Save up to 5 grants', 'Community support'],
  },
  pro: {
    name: 'Pro',
    price: '$29/month',
    features: [
      'AI-powered grant matching',
      'Unlimited saved grants',
      'Priority support',
      'Advanced analytics',
      'Custom grant alerts',
    ],
  },
  agency: {
    name: 'Agency',
    price: '$99/month',
    features: [
      'Multiple team members',
      'Custom AI training',
      'Dedicated account manager',
      'API access',
      'White-label reports',
    ],
  },
};

export function PlanInfo({ user }: PlanInfoProps) {
  const currentPlan = planDetails[user.plan as keyof typeof planDetails];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Current Plan</h2>
        <Link
          href="/pricing"
          className="text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          View all plans
        </Link>
      </div>
      
      <div className="mt-4">
        <div className="flex items-baseline">
          <span className="text-2xl font-bold text-gray-900">{currentPlan.name}</span>
          <span className="ml-2 text-sm text-gray-500">{currentPlan.price}</span>
        </div>
        
        <ul className="mt-4 space-y-2">
          {currentPlan.features.map((feature) => (
            <li key={feature} className="flex items-center text-sm text-gray-600">
              <svg
                className="h-5 w-5 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {user.plan !== 'agency' && (
        <div className="mt-6">
          <Link
            href="/pricing"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Upgrade Plan
          </Link>
        </div>
      )}
    </div>
  );
} 