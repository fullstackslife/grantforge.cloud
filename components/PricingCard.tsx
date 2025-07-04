import Link from 'next/link';

interface PricingPlan {
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
  isYearly: boolean;
}

export function PricingCard({ plan, isYearly }: PricingCardProps) {
  const price = isYearly ? plan.price.yearly : plan.price.monthly;
  const period = isYearly ? 'year' : 'month';

  return (
    <div
      className={`rounded-3xl p-8 ring-1 ring-gray-200 xl:p-10 ${
        plan.highlighted
          ? 'bg-gray-900 text-white ring-gray-900'
          : 'bg-white text-gray-900'
      }`}
    >
      <div className="flex items-center justify-between gap-x-4">
        <h3
          className={`text-lg font-semibold leading-8 ${
            plan.highlighted ? 'text-white' : 'text-gray-900'
          }`}
        >
          {plan.name}
        </h3>
        {plan.highlighted && (
          <p className="rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-semibold leading-5 text-blue-400">
            Most popular
          </p>
        )}
      </div>
      <p
        className={`mt-4 text-sm leading-6 ${
          plan.highlighted ? 'text-gray-300' : 'text-gray-600'
        }`}
      >
        {plan.description}
      </p>
      <p className="mt-6 flex items-baseline gap-x-1">
        <span
          className={`text-4xl font-bold tracking-tight ${
            plan.highlighted ? 'text-white' : 'text-gray-900'
          }`}
        >
          ${price}
        </span>
        <span
          className={`text-sm font-semibold leading-6 ${
            plan.highlighted ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          /{period}
        </span>
      </p>
      <Link
        href={plan.href}
        className={`mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
          plan.highlighted
            ? 'bg-blue-500 text-white hover:bg-blue-400 focus-visible:outline-blue-500'
            : 'bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-blue-600'
        }`}
      >
        {plan.cta}
      </Link>
      <ul
        role="list"
        className={`mt-8 space-y-3 text-sm leading-6 ${
          plan.highlighted ? 'text-gray-300' : 'text-gray-600'
        }`}
      >
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-x-3">
            <svg
              className={`h-6 w-5 flex-none ${
                plan.highlighted ? 'text-blue-400' : 'text-blue-600'
              }`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
} 