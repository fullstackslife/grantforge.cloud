import React from 'react';

type BillingCycle = 'monthly' | 'yearly';

interface PricingToggleProps {
  billingCycle: BillingCycle;
  onToggle: (cycle: BillingCycle) => void;
}

export function PricingToggle({ billingCycle, onToggle }: PricingToggleProps) {
  return (
    <div className="mt-8 flex justify-center">
      <div className="relative flex rounded-full bg-gray-100 p-1">
        <button
          type="button"
          className={`${
            billingCycle === 'monthly' ? 'bg-white shadow-sm' : ''
          } relative rounded-full px-4 py-2 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          onClick={() => onToggle('monthly')}
        >
          Monthly
        </button>
        <button
          type="button"
          className={`${
            billingCycle === 'yearly' ? 'bg-white shadow-sm' : ''
          } relative rounded-full px-4 py-2 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          onClick={() => onToggle('yearly')}
        >
          Yearly
          <span className="absolute -right-2 -top-2 rounded-full bg-blue-500 px-2 py-0.5 text-xs font-medium text-white">
            Save 20%
          </span>
        </button>
      </div>
    </div>
  );
} 