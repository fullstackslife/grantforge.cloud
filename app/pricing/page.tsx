'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PricingCard } from '@/components/PricingCard';
import { PricingToggle } from '@/components/PricingToggle';

const plans = {
  free: {
    name: 'Free',
    description: 'Perfect for exploring grant opportunities',
    price: {
      monthly: 0,
      yearly: 0,
    },
    features: [
      'Access to grant database',
      'Basic grant matching',
      'Save up to 5 grants',
      'Community support',
    ],
    cta: 'Get Started',
    href: '/signup',
  },
  pro: {
    name: 'Pro',
    description: 'For serious grant seekers',
    price: {
      monthly: 9,
      yearly: 90,
    },
    features: [
      'Everything in Free',
      'AI-powered grant matching',
      'Unlimited saved grants',
      'Priority support',
      'Advanced analytics',
      'Custom grant alerts',
    ],
    cta: 'Start Free Trial',
    href: process.env.PAYPAL_PAYMENT_LINK || 'https://www.paypal.com/ncp/links/YWT36BXE9XVHW',
    highlighted: true,
  },
  agency: {
    name: 'Agency',
    description: 'For grant writing agencies',
    price: {
      monthly: 99,
      yearly: 990,
    },
    features: [
      'Everything in Pro',
      'Multiple team members',
      'Custom AI training',
      'Dedicated account manager',
      'API access',
      'White-label reports',
    ],
    cta: 'Contact Sales',
    href: '/contact',
  },
};

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Choose the perfect plan for your grant writing needs. All plans include our core grant discovery features.
          </p>
        </div>

        <PricingToggle billingCycle={billingCycle} onToggle={setBillingCycle} />

        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {Object.entries(plans).map(([key, plan]) => (
            <PricingCard
              key={key}
              plan={plan}
              isYearly={billingCycle === 'yearly'}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-gray-600">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Need a custom plan? <Link href="/contact" className="text-blue-600 hover:text-blue-500">Contact us</Link>
          </p>
        </div>
      </div>
    </div>
  );
} 