import { useState, useEffect } from 'react';

export function usePaywall() {
  const [isSubscribed, setIsSubscribed] = useState(false); // Start as false

  // In a real app, this would check the user's subscription status
  // For development, we'll allow access to test the AI features
  useEffect(() => {
    // Check if user has submitted lead form (stored in localStorage)
    const hasSubmittedLead = localStorage.getItem('grantforge_lead_submitted');
    if (hasSubmittedLead) {
      setIsSubscribed(true);
    }
  }, []);

  const setSubscriptionStatus = (status: boolean) => {
    setIsSubscribed(status);
    if (status) {
      localStorage.setItem('grantforge_lead_submitted', 'true');
    }
  };

  return {
    isSubscribed,
    setIsSubscribed: setSubscriptionStatus
  };
} 