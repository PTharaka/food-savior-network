
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from 'framer-motion';
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';
import { Check } from 'lucide-react';
import EcoBackground from '@/components/EcoBackground';

interface DemoAccount {
  email: string;
  password: string;
  tier: string;
  features: string[];
}

const demoAccounts: DemoAccount[] = [
  {
    email: 'free@wastewise.com',
    password: 'demo123',
    tier: 'Free',
    features: ['Basic waste tracking', 'Up to 50 entries/month', 'Manual data entry']
  },
  {
    email: 'starter@wastewise.com',
    password: 'demo123',
    tier: 'Starter',
    features: ['Everything in Free +', 'Advanced analytics', '3 POS integrations', '10 donation alerts/month']
  },
  {
    email: 'pro@wastewise.com',
    password: 'demo123',
    tier: 'Pro',
    features: ['Everything in Starter +', 'Tax compliance tools', 'API access', 'Unlimited alerts']
  },
  {
    email: 'enterprise@wastewise.com',
    password: 'demo123',
    tier: 'Enterprise',
    features: ['Everything in Pro +', 'White-label reporting', 'Dedicated support', 'Custom integrations']
  }
];

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error: any) {
      // Error handling is done in AuthContext with toast
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (demoAccount: DemoAccount) => {
    setIsLoading(true);
    
    try {
      await login(demoAccount.email, demoAccount.password);
      toast.success(`Logged in as ${demoAccount.tier} tier demo user`);
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to login with demo account');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-wastewise-cream p-4 relative">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <EcoBackground />
      </div>
      
      <div className="w-full max-w-4xl z-10">
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-wastewise-green text-3xl font-bold">WasteWise</span>
          </Link>
        </div>
        
        <div className="glass-panel p-8 md:rounded-lg md:shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <motion.div
                className="text-center md:text-left mb-6"
                initial="initial"
                animate="animate"
                variants={fadeIn}
              >
                <h1 className="text-2xl font-bold text-wastewise-dark-green mb-2">Welcome Back</h1>
                <p className="text-wastewise-gray">Sign in to continue to your WasteWise dashboard</p>
              </motion.div>
              
              <motion.form
                onSubmit={handleSubmit}
                initial="initial"
                animate="animate"
                variants={fadeIn}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@yourbusiness.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-xs text-wastewise-green hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-wastewise-green hover:bg-wastewise-dark-green"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </motion.form>
              
              <motion.div
                className="mt-6 text-center"
                initial="initial"
                animate="animate"
                variants={fadeIn}
              >
                <p className="text-wastewise-gray text-sm">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-wastewise-green hover:underline">
                    Create account
                  </Link>
                </p>
                
                <div className="mt-4">
                  <Button
                    variant="link"
                    type="button"
                    onClick={() => setShowDemoAccounts(!showDemoAccounts)}
                    className="text-sm text-wastewise-dark-green"
                  >
                    {showDemoAccounts ? 'Hide Demo Accounts' : 'Show Demo Accounts'}
                  </Button>
                </div>
              </motion.div>
            </div>
            
            <div className="hidden md:block">
              {showDemoAccounts ? (
                <motion.div
                  className="space-y-4"
                  initial="initial"
                  animate="animate"
                  variants={fadeIn}
                >
                  <h2 className="text-lg font-semibold text-wastewise-dark-green mb-4">Demo Accounts</h2>
                  <p className="text-sm text-wastewise-gray mb-4">
                    Try different subscription tiers with these demo accounts. 
                    The password for all accounts is <code className="bg-wastewise-light-gray/20 px-1 py-0.5 rounded text-wastewise-dark-green">demo123</code>
                  </p>
                  
                  <div className="space-y-3">
                    {demoAccounts.map((account, index) => (
                      <div 
                        key={account.email}
                        className="glass-panel p-3 border border-wastewise-light-gray/20 hover:border-wastewise-green/30 transition-all cursor-pointer"
                        onClick={() => handleDemoLogin(account)}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <span className="font-medium text-wastewise-dark-green">{account.tier} Tier</span>
                            <div className="text-xs text-wastewise-gray">{account.email}</div>
                          </div>
                          <Button 
                            size="sm" 
                            variant="secondary"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDemoLogin(account);
                            }}
                          >
                            Try it
                          </Button>
                        </div>
                        <ul className="text-xs space-y-1">
                          {account.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <Check className="h-3 w-3 text-wastewise-green mt-0.5 shrink-0" />
                              <span className="text-wastewise-gray">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  className="flex flex-col justify-center h-full"
                  initial="initial"
                  animate="animate"
                  variants={fadeIn}
                >
                  <div className="glass-panel p-6 border border-wastewise-light-gray/20">
                    <h2 className="text-lg font-semibold text-wastewise-dark-green mb-3">
                      Welcome to WasteWise
                    </h2>
                    <p className="text-wastewise-gray text-sm mb-4">
                      Reduce food waste and increase profits with our comprehensive platform.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-wastewise-green mt-0.5 shrink-0" />
                        <span className="text-wastewise-gray">Track waste and identify patterns</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-wastewise-green mt-0.5 shrink-0" />
                        <span className="text-wastewise-gray">Connect with local food banks for donations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-wastewise-green mt-0.5 shrink-0" />
                        <span className="text-wastewise-gray">Generate tax-compliant donation reports</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-wastewise-green mt-0.5 shrink-0" />
                        <span className="text-wastewise-gray">Analyze your impact with detailed metrics</span>
                      </li>
                    </ul>
                    <div className="mt-4 text-sm text-wastewise-gray">
                      <Button 
                        variant="link" 
                        className="text-wastewise-green p-0"
                        onClick={() => setShowDemoAccounts(true)}
                      >
                        Try our demo accounts
                      </Button> to explore different subscription tiers.
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Mobile demo accounts view */}
          {showDemoAccounts && (
            <motion.div
              className="mt-6 md:hidden space-y-4"
              initial="initial"
              animate="animate"
              variants={fadeIn}
            >
              <h2 className="text-lg font-semibold text-wastewise-dark-green mb-2">Demo Accounts</h2>
              <p className="text-sm text-wastewise-gray mb-4">
                Try different subscription tiers with these demo accounts. 
                The password for all accounts is <code className="bg-wastewise-light-gray/20 px-1 py-0.5 rounded text-wastewise-dark-green">demo123</code>
              </p>
              
              <div className="space-y-3">
                {demoAccounts.map((account) => (
                  <div 
                    key={account.email}
                    className="glass-panel p-3 border border-wastewise-light-gray/20 hover:border-wastewise-green/30 transition-all cursor-pointer"
                    onClick={() => handleDemoLogin(account)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <span className="font-medium text-wastewise-dark-green">{account.tier} Tier</span>
                        <div className="text-xs text-wastewise-gray">{account.email}</div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDemoLogin(account);
                        }}
                      >
                        Try it
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
