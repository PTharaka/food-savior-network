
import React, { useState } from 'react';
import { Check, X, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import EcoBackground from '@/components/EcoBackground';

const pricingTiers = [
  {
    name: 'Freemium',
    price: {
      monthly: '$0',
      annually: '$0',
    },
    description: 'Basic waste tracking for small businesses',
    features: [
      'Up to 50 waste entries per month',
      'Basic waste tracking',
      'Manual data entry',
      '3 donation alerts per month',
      'Simple analytics dashboard',
    ],
    limitedFeatures: [
      'No POS integrations',
      'No tax compliance tools',
      'No API access',
      'No predictive analytics',
    ],
    ctaText: 'Get Started Free',
    highlighted: false,
    badge: null,
  },
  {
    name: 'Starter',
    price: {
      monthly: '$49',
      annually: '$42',
    },
    description: 'Advanced features for growing businesses',
    features: [
      'Up to 500 waste entries per month',
      'Advanced analytics',
      '3 POS integrations',
      '10 donation alerts per month',
      'Employee gamification',
      'Email + chat support',
    ],
    limitedFeatures: [
      'No tax compliance tools',
      'No API access',
      'Limited predictive analytics',
    ],
    ctaText: 'Start 14-Day Trial',
    highlighted: false,
    badge: 'Popular',
  },
  {
    name: 'Pro',
    price: {
      monthly: '$199',
      annually: '$169',
    },
    description: 'Comprehensive solution for established businesses',
    features: [
      'Up to 5,000 waste entries per month',
      'Full analytics suite',
      '10 POS integrations',
      'Unlimited donation alerts',
      'Tax compliance tools',
      'API access',
      'AI-powered predictions',
      'Priority support',
    ],
    limitedFeatures: [
      'No white-label reporting',
      'No dedicated support',
    ],
    ctaText: 'Start 14-Day Trial',
    highlighted: true,
    badge: 'Best Value',
  },
  {
    name: 'Enterprise',
    price: {
      monthly: 'Custom',
      annually: 'Custom',
    },
    description: 'Tailored solutions for large organizations',
    features: [
      'Unlimited waste entries',
      'Unlimited POS integrations',
      'Unlimited donation alerts',
      'White-label reporting',
      'Dedicated support',
      'Custom integrations',
      'Full feature access',
      '24/7 phone, email & chat support',
    ],
    limitedFeatures: [],
    ctaText: 'Contact Sales',
    highlighted: false,
    badge: 'Enterprise',
  },
];

const discounts = [
  {
    name: 'Annual Payment',
    description: '15% off for yearly subscriptions',
    conditions: 'Available for all paid plans',
  },
  {
    name: 'Nonprofit Discount',
    description: '50% off for food banks and shelters',
    conditions: 'Valid organization verification required',
  },
  {
    name: 'Volume Discount',
    description: 'Special pricing for multi-location businesses',
    conditions: 'Contact sales for custom quote',
  },
];

const PricingPage: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annually'>('monthly');
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const handlePricingClick = (tier: string) => {
    if (tier === 'Enterprise') {
      window.open('mailto:sales@wastewise.com?subject=Enterprise Plan Inquiry', '_blank');
    } else {
      navigate('/signup', { state: { selectedPlan: tier } });
    }
  };

  return (
    <div className="min-h-screen bg-wastewise-cream overflow-hidden">
      <Navbar />
      
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
        <EcoBackground />
      </div>
      
      <main className="relative pt-24 pb-16 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="bg-wastewise-green/10 text-wastewise-dark-green rounded-full px-4 py-1 text-sm font-medium inline-block mb-4">
              Transparent Pricing
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-wastewise-dark-gray mb-4">
              Choose the right plan for your business
            </motion.h1>
            <motion.p variants={itemVariants} className="text-wastewise-gray text-xl max-w-3xl mx-auto mb-8">
              All plans include a 14-day free trial with no credit card required and a 30-day money-back guarantee
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-12">
              <Label htmlFor="billing-toggle" className={billingPeriod === 'monthly' ? 'font-semibold' : ''}>Monthly</Label>
              <Switch
                id="billing-toggle"
                checked={billingPeriod === 'annually'}
                onCheckedChange={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annually' : 'monthly')}
              />
              <Label htmlFor="billing-toggle" className={billingPeriod === 'annually' ? 'font-semibold' : ''}>
                Annually <Badge variant="outline" className="ml-1 font-normal bg-wastewise-green/10">Save 15%</Badge>
              </Label>
            </motion.div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                className={`glass-panel relative ${tier.highlighted ? 'border-wastewise-green/50 shadow-lg ring-1 ring-wastewise-green/20' : ''}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {tier.badge && (
                  <div className="absolute -top-3 right-4">
                    <Badge className={`${tier.highlighted ? 'bg-wastewise-green text-white' : 'bg-wastewise-light-green/20 text-wastewise-dark-green'}`}>
                      {tier.badge}
                    </Badge>
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-wastewise-dark-gray mb-2">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-wastewise-dark-green">
                      {billingPeriod === 'monthly' ? tier.price.monthly : tier.price.annually}
                    </span>
                    {tier.price.monthly !== 'Custom' && (
                      <span className="text-wastewise-gray">/month</span>
                    )}
                  </div>
                  <p className="text-wastewise-gray mb-6">{tier.description}</p>
                  
                  <Button 
                    className={`w-full ${tier.highlighted ? 'bg-wastewise-green hover:bg-wastewise-dark-green text-white' : 'bg-white border border-wastewise-light-gray hover:bg-wastewise-light-gray/10 text-wastewise-dark-gray'}`}
                    onClick={() => handlePricingClick(tier.name)}
                  >
                    {tier.ctaText}
                  </Button>
                </div>
                
                <div className="px-6 pt-4 pb-6 border-t border-wastewise-light-gray/30">
                  <p className="font-medium text-wastewise-dark-gray mb-4">What's included:</p>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check size={18} className="text-wastewise-green mt-0.5 shrink-0" />
                        <span className="text-sm text-wastewise-gray">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {tier.limitedFeatures.length > 0 && (
                    <>
                      <p className="font-medium text-wastewise-dark-gray mb-4">Not included:</p>
                      <ul className="space-y-3">
                        {tier.limitedFeatures.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <X size={18} className="text-wastewise-gray/50 mt-0.5 shrink-0" />
                            <span className="text-sm text-wastewise-gray/70">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Discounts Section */}
          <motion.div
            className="glass-panel p-8 mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-wastewise-dark-green mb-6">Discounts & Incentives</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {discounts.map((discount, index) => (
                <div key={index} className="bg-white/50 rounded-xl p-5 border border-wastewise-light-green/10">
                  <h3 className="text-lg font-semibold text-wastewise-dark-gray mb-2">{discount.name}</h3>
                  <p className="text-wastewise-gray mb-3">{discount.description}</p>
                  <p className="text-sm text-wastewise-green font-medium">{discount.conditions}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* FAQ Section */}
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-wastewise-dark-gray mb-6">Frequently Asked Questions</h2>
            <div className="text-left glass-panel p-6 divide-y divide-wastewise-light-gray/30">
              <div className="py-5">
                <h3 className="font-semibold text-wastewise-dark-gray mb-2">Can I upgrade or downgrade my plan?</h3>
                <p className="text-wastewise-gray">Yes, you can change your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the new rate applies at the start of your next billing cycle.</p>
              </div>
              <div className="py-5">
                <h3 className="font-semibold text-wastewise-dark-gray mb-2">How does the money-back guarantee work?</h3>
                <p className="text-wastewise-gray">If you're not satisfied with WasteWise within the first 30 days of your paid subscription, contact our support team for a full refund, no questions asked.</p>
              </div>
              <div className="py-5">
                <h3 className="font-semibold text-wastewise-dark-gray mb-2">Do you offer custom enterprise plans?</h3>
                <p className="text-wastewise-gray">Yes, our enterprise plans are customized to your specific needs. Contact our sales team for a personalized quote and to discuss your requirements.</p>
              </div>
            </div>
            
            <div className="mt-12">
              <h3 className="text-xl font-bold text-wastewise-dark-gray mb-4">Ready to reduce food waste and increase profits?</h3>
              <Button 
                className="btn-primary"
                onClick={() => navigate('/signup')}
              >
                Start Your Free Trial <ArrowRight size={16} className="ml-2" />
              </Button>
              <p className="mt-4 text-sm text-wastewise-gray">No credit card required. Free for 14 days.</p>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PricingPage;
