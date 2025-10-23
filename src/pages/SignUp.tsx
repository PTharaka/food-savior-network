
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Check, Building2, Utensils, Building, ShoppingBag, Gift } from 'lucide-react';
import { Coffee, Truck } from '@/components/ui/icons';
import EcoBackground from '@/components/EcoBackground';

const businessTypes = [
  { value: 'restaurant', label: 'Restaurant', icon: <Utensils className="h-4 w-4" /> },
  { value: 'cafe', label: 'Café', icon: <Coffee className="h-4 w-4" /> },
  { value: 'supermarket', label: 'Supermarket', icon: <ShoppingBag className="h-4 w-4" /> },
  { value: 'hotel', label: 'Hotel', icon: <Building className="h-4 w-4" /> },
  { value: 'food_distributor', label: 'Food Distributor', icon: <Truck className="h-4 w-4" /> },
  { value: 'charity', label: 'Food Bank/Charity', icon: <Gift className="h-4 w-4" /> },
  { value: 'other', label: 'Other', icon: <Building2 className="h-4 w-4" /> }
];

const subscriptionPlans = [
  {
    id: 'free',
    name: 'Free',
    description: 'Basic waste tracking',
    price: '$0',
    features: [
      'Up to 50 waste entries per month',
      'Manual data entry',
      'Basic waste analytics',
      '3 donation alerts per month'
    ]
  },
  {
    id: 'starter',
    name: 'Starter',
    description: 'For growing businesses',
    price: '$49',
    features: [
      'Up to 500 waste entries per month',
      'Advanced analytics',
      '3 POS integrations',
      '10 donation alerts per month',
      'Email + chat support'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Full-featured solution',
    price: '$199',
    features: [
      'Up to 5,000 waste entries per month',
      'Full analytics suite',
      '10 POS integrations',
      'Unlimited donation alerts',
      'Tax compliance tools',
      'API access'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Custom solution',
    price: 'Custom',
    features: [
      'Unlimited waste entries',
      'White-label reporting',
      'Dedicated support',
      'Custom integrations',
      'Priority support'
    ]
  }
];

type LocationState = {
  selectedPlan?: string;
};

const SignUp = () => {
  const location = useLocation();
  const locationState = location.state as LocationState;
  const initialPlan = locationState?.selectedPlan?.toLowerCase() || 'free';

  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessType: '',
    plan: initialPlan,
    isNonprofit: false,
    billingCycle: 'monthly'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState('account');
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRadioChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validatePassword = (password: string): { valid: boolean; message?: string } => {
    if (password.length < 8) {
      return { valid: false, message: 'Password must be at least 8 characters long' };
    }
    if (!/[A-Z]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one uppercase letter' };
    }
    if (!/[a-z]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one lowercase letter' };
    }
    if (!/[0-9]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one number' };
    }
    return { valid: true };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.businessName || !formData.email || !formData.businessType) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.valid) {
      toast.error(passwordValidation.message || 'Invalid password');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signup(
        formData.email, 
        formData.password, 
        formData.businessName, 
        formData.businessType,
        formData.plan
      );
      
      navigate('/dashboard');
    } catch (error: any) {
      // Error handling is done in AuthContext with toast
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculatePrice = (plan: any) => {
    if (plan.id === 'free' || plan.id === 'enterprise') return plan.price;
    
    const basePrice = parseFloat(plan.price.replace('$', ''));
    let finalPrice = basePrice;
    
    // Apply discount for annual billing
    if (formData.billingCycle === 'annually') {
      finalPrice = basePrice * 0.85; // 15% discount
    }
    
    // Apply nonprofit discount if applicable
    if (formData.isNonprofit && plan.id !== 'free') {
      finalPrice = finalPrice * 0.5; // 50% discount
    }
    
    return `$${finalPrice}${formData.billingCycle === 'annually' ? '/mo (billed annually)' : '/mo'}`;
  };

  // Get the selected plan's details
  const getSelectedPlan = () => {
    return subscriptionPlans.find(plan => plan.id === formData.plan) || subscriptionPlans[0];
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-wastewise-cream relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <EcoBackground />
      </div>
      
      <div className="mx-auto w-full max-w-7xl px-6 py-12 z-10">
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-wastewise-green text-3xl font-bold">WasteWise</span>
          </Link>
        </div>
        
        <div className="glass-panel max-w-5xl mx-auto p-8 rounded-xl">
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="account">Account Details</TabsTrigger>
              <TabsTrigger value="plan">Select Plan</TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleSubmit}>
              <TabsContent value="account">
                <motion.div 
                  className="space-y-6"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={fadeIn}
                >
                  <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-wastewise-dark-green">Create Your WasteWise Account</h1>
                    <p className="text-wastewise-gray mt-2">Start reducing food waste and increasing profits today</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="businessName"
                        placeholder="Your Business Name"
                        value={formData.businessName}
                        onChange={handleChange}
                        required
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Business Email <span className="text-red-500">*</span></Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@yourbusiness.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="businessType">Business Type <span className="text-red-500">*</span></Label>
                      <Select onValueChange={(value) => handleSelectChange('businessType', value)} value={formData.businessType}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          {businessTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center gap-2">
                                {type.icon}
                                {type.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="isNonprofit">Organization Type</Label>
                      <RadioGroup 
                        defaultValue="forprofit" 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, isNonprofit: value === 'nonprofit' }))}
                        className="flex flex-col space-y-1 mt-3"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="forprofit" id="forprofit" />
                          <Label htmlFor="forprofit">For-profit business</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="nonprofit" id="nonprofit" />
                          <Label htmlFor="nonprofit">Nonprofit organization (50% discount applies)</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full"
                      />
                      <p className="text-xs text-wastewise-gray">
                        Min 8 characters, with uppercase, lowercase, and number
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password <span className="text-red-500">*</span></Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <Link to="/login">
                      <Button variant="outline" type="button">
                        Already have an account?
                      </Button>
                    </Link>
                    <Button
                      type="button"
                      className="bg-wastewise-green hover:bg-wastewise-dark-green"
                      onClick={() => {
                        // Validate required fields before proceeding
                        if (!formData.businessName || !formData.email || !formData.businessType || !formData.password || !formData.confirmPassword) {
                          toast.error('Please fill in all required fields');
                          return;
                        }
                        
                        const passwordValidation = validatePassword(formData.password);
                        if (!passwordValidation.valid) {
                          toast.error(passwordValidation.message || 'Invalid password');
                          return;
                        }
                        
                        if (formData.password !== formData.confirmPassword) {
                          toast.error('Passwords do not match');
                          return;
                        }
                        
                        // Switch to plan tab
                        setCurrentTab('plan');
                      }}
                    >
                      Continue to Plans <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="plan">
                <motion.div
                  className="space-y-6"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={fadeIn}
                >
                  <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-wastewise-dark-green">Choose Your Plan</h1>
                    <p className="text-wastewise-gray mt-2">All plans include a 14-day trial and 30-day money-back guarantee</p>
                  </div>
                  
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Label htmlFor="billing-monthly" className={formData.billingCycle === 'monthly' ? 'font-semibold' : ''}>
                      Monthly Billing
                    </Label>
                    <RadioGroup
                      defaultValue={formData.billingCycle}
                      onValueChange={(value) => handleRadioChange('billingCycle', value)}
                      className="flex items-center gap-2"
                    >
                      <div className="flex items-center">
                        <RadioGroupItem value="monthly" id="billing-monthly" className="sr-only" />
                        <RadioGroupItem value="annually" id="billing-annually" className="sr-only" />
                        <div 
                          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
                            formData.billingCycle === 'annually' ? 'bg-wastewise-green' : 'bg-wastewise-gray/30'
                          }`}
                          onClick={() => handleRadioChange('billingCycle', formData.billingCycle === 'monthly' ? 'annually' : 'monthly')}
                        >
                          <div 
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                              formData.billingCycle === 'annually' ? 'translate-x-6' : ''
                            }`} 
                          />
                        </div>
                      </div>
                    </RadioGroup>
                    <Label htmlFor="billing-annually" className={formData.billingCycle === 'annually' ? 'font-semibold' : ''}>
                      Annual Billing <span className="text-xs bg-wastewise-green/10 text-wastewise-green rounded-full px-2 py-0.5 ml-1">Save 15%</span>
                    </Label>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {subscriptionPlans.map((plan) => (
                      <div 
                        key={plan.id}
                        className={`glass-panel border relative p-6 cursor-pointer transition-all ${
                          formData.plan === plan.id 
                            ? 'border-wastewise-green ring-1 ring-wastewise-green/30 shadow-md' 
                            : 'border-transparent hover:border-wastewise-light-green/50'
                        }`}
                        onClick={() => handleSelectChange('plan', plan.id)}
                      >
                        {formData.plan === plan.id && (
                          <div className="absolute top-3 right-3 text-wastewise-green">
                            <Check className="h-5 w-5" />
                          </div>
                        )}
                        
                        <h3 className="text-lg font-bold text-wastewise-dark-green mb-1">{plan.name}</h3>
                        <p className="text-sm text-wastewise-gray mb-3">{plan.description}</p>
                        
                        <div className="mb-4">
                          <span className="text-2xl font-bold text-wastewise-dark-green">
                            {calculatePrice(plan)}
                          </span>
                        </div>
                        
                        <ul className="space-y-2 mb-4">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <Check className="h-4 w-4 text-wastewise-green mt-0.5 shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {plan.id === 'enterprise' ? (
                          <Button 
                            type="button"
                            variant="outline"
                            className="w-full mt-auto" 
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open('mailto:sales@wastewise.com?subject=Enterprise Plan Inquiry', '_blank');
                            }}
                          >
                            Contact Sales
                          </Button>
                        ) : (
                          <Button 
                            type="button"
                            className={`w-full mt-auto ${
                              formData.plan === plan.id 
                                ? 'bg-wastewise-green hover:bg-wastewise-dark-green text-white' 
                                : 'bg-wastewise-light-gray/20 hover:bg-wastewise-light-gray/30 text-wastewise-dark-gray'
                            }`}
                            onClick={() => handleSelectChange('plan', plan.id)}
                          >
                            {formData.plan === plan.id ? 'Selected' : 'Select Plan'}
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Selected plan summary */}
                  <div className="glass-panel border border-wastewise-light-green/20 p-6 mb-6">
                    <h3 className="text-lg font-semibold text-wastewise-dark-green mb-3">Order Summary</h3>
                    
                    <div className="flex justify-between mb-2">
                      <span className="text-wastewise-gray">{getSelectedPlan().name} Plan</span>
                      <span className="font-medium">{getSelectedPlan().price}</span>
                    </div>
                    
                    {formData.billingCycle === 'annually' && getSelectedPlan().id !== 'free' && getSelectedPlan().id !== 'enterprise' && (
                      <div className="flex justify-between mb-2 text-wastewise-green">
                        <span>Annual Discount (15%)</span>
                        <span>-15%</span>
                      </div>
                    )}
                    
                    {formData.isNonprofit && getSelectedPlan().id !== 'free' && getSelectedPlan().id !== 'enterprise' && (
                      <div className="flex justify-between mb-2 text-wastewise-green">
                        <span>Nonprofit Discount (50%)</span>
                        <span>-50%</span>
                      </div>
                    )}
                    
                    <div className="border-t border-wastewise-light-gray/30 mt-3 pt-3 flex justify-between font-bold">
                      <span>Total</span>
                      <span>{calculatePrice(getSelectedPlan())}</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-wastewise-gray mb-8">
                    <p>By clicking "Create Account" you agree to our <Link to="#" className="text-wastewise-green hover:underline">Terms of Service</Link> and <Link to="#" className="text-wastewise-green hover:underline">Privacy Policy</Link>.</p>
                    <p className="mt-2">All plans include a 14-day free trial period and a 30-day money-back guarantee.</p>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        const accountTab = document.querySelector('[data-value="account"]') as HTMLElement;
                        if (accountTab) accountTab.click();
                      }}
                    >
                      Back to Account Details
                    </Button>
                    
                    <Button 
                      type="submit" 
                      className="bg-wastewise-green hover:bg-wastewise-dark-green"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </div>
                </motion.div>
              </TabsContent>
            </form>
          </Tabs>
        </div>
        
        <div className="text-center mt-8 text-wastewise-gray">
          <p>Demo access: <code>free@wastewise.com</code>, <code>starter@wastewise.com</code>, <code>pro@wastewise.com</code> with password <code>demo123</code></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
