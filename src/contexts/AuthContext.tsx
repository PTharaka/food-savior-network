
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

export type SubscriptionTier = 'free' | 'starter' | 'pro' | 'enterprise';

type User = {
  id: string;
  email: string;
  businessName?: string;
  businessType?: string;
  subscriptionTier?: SubscriptionTier;
} | null;

interface AuthContextType {
  user: User;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, businessName: string, businessType: string, subscriptionTier?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem('wastewise_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate authentication API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check for demo credentials
      if (email === 'demo@wastewise.com' && password === 'demo123') {
        const demoUser = {
          id: 'user_demo',
          email: 'demo@wastewise.com',
          businessName: 'Demo Restaurant',
          businessType: 'restaurant',
          subscriptionTier: 'free' as SubscriptionTier
        };
        setUser(demoUser);
        localStorage.setItem('wastewise_user', JSON.stringify(demoUser));
        toast.success("Logged in as Free Tier Demo User");
        return;
      }
      
      // Check for free tier demo
      if (email === 'free@wastewise.com' && password === 'demo123') {
        const freeUser = {
          id: 'user_free',
          email: 'free@wastewise.com',
          businessName: 'Free Restaurant',
          businessType: 'restaurant',
          subscriptionTier: 'free' as SubscriptionTier
        };
        setUser(freeUser);
        localStorage.setItem('wastewise_user', JSON.stringify(freeUser));
        toast.success("Logged in as Free Tier Demo User");
        return;
      }
      
      // Check for starter tier demo
      if (email === 'starter@wastewise.com' && password === 'demo123') {
        const starterUser = {
          id: 'user_starter',
          email: 'starter@wastewise.com',
          businessName: 'Starter Restaurant',
          businessType: 'restaurant',
          subscriptionTier: 'starter' as SubscriptionTier
        };
        setUser(starterUser);
        localStorage.setItem('wastewise_user', JSON.stringify(starterUser));
        toast.success("Logged in as Starter Tier Demo User");
        return;
      }
      
      // Check for pro tier demo
      if (email === 'pro@wastewise.com' && password === 'demo123') {
        const proUser = {
          id: 'user_pro',
          email: 'pro@wastewise.com',
          businessName: 'Pro Restaurant',
          businessType: 'restaurant',
          subscriptionTier: 'pro' as SubscriptionTier
        };
        setUser(proUser);
        localStorage.setItem('wastewise_user', JSON.stringify(proUser));
        toast.success("Logged in as Pro Tier Demo User");
        return;
      }
      
      // Check for enterprise tier demo
      if (email === 'enterprise@wastewise.com' && password === 'demo123') {
        const enterpriseUser = {
          id: 'user_enterprise',
          email: 'enterprise@wastewise.com',
          businessName: 'Enterprise Corp',
          businessType: 'food_distributor',
          subscriptionTier: 'enterprise' as SubscriptionTier
        };
        setUser(enterpriseUser);
        localStorage.setItem('wastewise_user', JSON.stringify(enterpriseUser));
        toast.success("Logged in as Enterprise Tier Demo User");
        return;
      }
      
      // Check for trial demo
      if (email === 'trial@wastewise.com' && password === 'demo123') {
        const trialUser = {
          id: 'user_trial',
          email: 'trial@wastewise.com',
          businessName: 'Trial Restaurant',
          businessType: 'restaurant',
          subscriptionTier: 'pro' as SubscriptionTier
        };
        setUser(trialUser);
        localStorage.setItem('wastewise_user', JSON.stringify(trialUser));
        toast.success("Logged in as Trial User (Pro features)");
        return;
      }
      
      // In a real app, validate credentials with backend
      // For demo, any email with password longer than 6 chars works
      if (password.length >= 6) {
        const newUser = {
          id: `user_${Date.now()}`,
          email,
          businessName: 'Demo Business',
          subscriptionTier: 'free' as SubscriptionTier
        };
        setUser(newUser);
        localStorage.setItem('wastewise_user', JSON.stringify(newUser));
        toast.success("Logged in successfully");
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast.error("Failed to login. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, businessName: string, businessType: string, subscriptionTier: string = 'free') => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const tier = (subscriptionTier as SubscriptionTier) || 'free';
      
      const newUser = {
        id: `user_${Date.now()}`,
        email,
        businessName,
        businessType,
        subscriptionTier: tier
      };
      setUser(newUser);
      localStorage.setItem('wastewise_user', JSON.stringify(newUser));
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('wastewise_user');
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading, 
        login, 
        signup, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
