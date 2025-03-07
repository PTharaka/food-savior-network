
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export type SubscriptionTier = 'free' | 'starter' | 'pro' | 'enterprise';

interface SubscriptionFeatures {
  maxWasteEntries: number;
  advancedAnalytics: boolean;
  posIntegrations: number;
  donationAlerts: number;
  taxComplianceTools: boolean;
  apiAccess: boolean;
  whiteLabel: boolean;
  dedicatedSupport: boolean;
  customIntegrations: boolean;
  unlimitedAlerts: boolean;
}

const featuresByTier: Record<SubscriptionTier, SubscriptionFeatures> = {
  free: {
    maxWasteEntries: 50,
    advancedAnalytics: false,
    posIntegrations: 0,
    donationAlerts: 3,
    taxComplianceTools: false,
    apiAccess: false,
    whiteLabel: false,
    dedicatedSupport: false,
    customIntegrations: false,
    unlimitedAlerts: false
  },
  starter: {
    maxWasteEntries: 500,
    advancedAnalytics: true,
    posIntegrations: 3,
    donationAlerts: 10,
    taxComplianceTools: false,
    apiAccess: false,
    whiteLabel: false,
    dedicatedSupport: false,
    customIntegrations: false,
    unlimitedAlerts: false
  },
  pro: {
    maxWasteEntries: 5000,
    advancedAnalytics: true,
    posIntegrations: 10,
    donationAlerts: 0, // unlimited
    taxComplianceTools: true,
    apiAccess: true,
    whiteLabel: false,
    dedicatedSupport: false,
    customIntegrations: false,
    unlimitedAlerts: true
  },
  enterprise: {
    maxWasteEntries: 0, // unlimited
    advancedAnalytics: true,
    posIntegrations: 0, // unlimited
    donationAlerts: 0, // unlimited
    taxComplianceTools: true,
    apiAccess: true,
    whiteLabel: true,
    dedicatedSupport: true,
    customIntegrations: true,
    unlimitedAlerts: true
  }
};

interface SubscriptionData {
  tier: SubscriptionTier;
  features: SubscriptionFeatures;
  price: string;
  entriesUsed: number;
  alertsUsed: number;
  renewalDate: string | null;
  isTrialing: boolean;
  trialEndsAt: string | null;
  discount: string | null;
  canUpgrade: boolean;
}

interface SubscriptionContextType {
  subscription: SubscriptionData;
  isFeatureAvailable: (feature: keyof SubscriptionFeatures) => boolean;
  getRemainingEntries: () => number;
  getRemainingAlerts: () => number;
  upgradeTier: (newTier: SubscriptionTier) => void;
  isReachingLimit: (feature: 'entries' | 'alerts') => boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionData>({
    tier: 'free',
    features: featuresByTier.free,
    price: 'Free',
    entriesUsed: 0,
    alertsUsed: 0,
    renewalDate: null,
    isTrialing: false,
    trialEndsAt: null,
    discount: null,
    canUpgrade: true
  });

  useEffect(() => {
    // For demo purposes, assign the subscription tier based on the email
    if (user) {
      if (user.email === 'demo@wastewise.com') {
        // Free tier for our standard demo user
        setSubscription({
          tier: 'free',
          features: featuresByTier.free,
          price: 'Free',
          entriesUsed: 23,
          alertsUsed: 1,
          renewalDate: null,
          isTrialing: false,
          trialEndsAt: null,
          discount: null,
          canUpgrade: true
        });
      } else if (user.email === 'starter@wastewise.com') {
        // Starter tier demo user
        setSubscription({
          tier: 'starter',
          features: featuresByTier.starter,
          price: '$49/month',
          entriesUsed: 234,
          alertsUsed: 7,
          renewalDate: '2023-12-01',
          isTrialing: false,
          trialEndsAt: null,
          discount: null,
          canUpgrade: true
        });
      } else if (user.email === 'pro@wastewise.com') {
        // Pro tier demo user
        setSubscription({
          tier: 'pro',
          features: featuresByTier.pro,
          price: '$199/month',
          entriesUsed: 1256,
          alertsUsed: 38,
          renewalDate: '2023-12-15',
          isTrialing: false,
          trialEndsAt: null,
          discount: '15% (Annual)',
          canUpgrade: true
        });
      } else if (user.email.includes('trial')) {
        // Trial user
        setSubscription({
          tier: 'pro',
          features: featuresByTier.pro,
          price: 'Free Trial',
          entriesUsed: 45,
          alertsUsed: 8,
          renewalDate: null,
          isTrialing: true,
          trialEndsAt: '2023-11-30',
          discount: null,
          canUpgrade: false
        });
      } else {
        // Default to free tier for any other user
        setSubscription({
          tier: 'free',
          features: featuresByTier.free,
          price: 'Free',
          entriesUsed: Math.floor(Math.random() * 30),
          alertsUsed: Math.floor(Math.random() * 2),
          renewalDate: null,
          isTrialing: false,
          trialEndsAt: null,
          discount: null,
          canUpgrade: true
        });
      }
    }
  }, [user]);

  const isFeatureAvailable = (feature: keyof SubscriptionFeatures): boolean => {
    if (!subscription) return false;
    
    if (feature === 'maxWasteEntries') {
      const max = subscription.features.maxWasteEntries;
      return max === 0 || subscription.entriesUsed < max;
    }
    
    if (feature === 'donationAlerts') {
      const max = subscription.features.donationAlerts;
      return max === 0 || subscription.alertsUsed < max;
    }
    
    return !!subscription.features[feature];
  };

  const getRemainingEntries = (): number => {
    const max = subscription.features.maxWasteEntries;
    if (max === 0) return Infinity; // Unlimited
    return Math.max(0, max - subscription.entriesUsed);
  };

  const getRemainingAlerts = (): number => {
    const max = subscription.features.donationAlerts;
    if (max === 0) return Infinity; // Unlimited
    return Math.max(0, max - subscription.alertsUsed);
  };

  const isReachingLimit = (feature: 'entries' | 'alerts'): boolean => {
    if (feature === 'entries') {
      const max = subscription.features.maxWasteEntries;
      if (max === 0) return false; // Unlimited
      return subscription.entriesUsed >= max * 0.8; // 80% of limit
    } else if (feature === 'alerts') {
      const max = subscription.features.donationAlerts;
      if (max === 0) return false; // Unlimited
      return subscription.alertsUsed >= max * 0.8; // 80% of limit
    }
    return false;
  };

  const upgradeTier = (newTier: SubscriptionTier) => {
    // In a real app, this would trigger the payment flow
    // For demo purposes, we'll just update the state
    setSubscription(prev => ({
      ...prev,
      tier: newTier,
      features: featuresByTier[newTier],
      price: newTier === 'free' ? 'Free' : 
             newTier === 'starter' ? '$49/month' : 
             newTier === 'pro' ? '$199/month' : 'Custom',
      isTrialing: false,
      trialEndsAt: null,
    }));
  };

  return (
    <SubscriptionContext.Provider value={{ 
      subscription, 
      isFeatureAvailable, 
      getRemainingEntries, 
      getRemainingAlerts,
      upgradeTier,
      isReachingLimit
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
