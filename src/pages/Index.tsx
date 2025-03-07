
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, CheckCircle2, TrendingUp, Landmark, AlertTriangle, Leaf, BadgeCheck, Globe, DollarSign } from 'lucide-react';
import { toast } from "sonner";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.5]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  const handleEarlyAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    // In a real application, this would send the email to your backend
    toast.success("Thank you for your interest! Check your email for access details.");
    
    // For the demo, simulate getting early access by redirecting to login
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  const featuresData = [
    {
      title: "Waste Tracking",
      description: "Automatically track food waste through barcode scanning, POS integration, or manual entry.",
      icon: <TrendingUp className="h-6 w-6 text-wastewise-green" />,
      items: ["Barcode scanning", "POS integration", "Manual entry", "Real-time inventory updates"]
    },
    {
      title: "Donation Management",
      description: "Connect with local food banks and charities for seamless donation coordination.",
      icon: <Landmark className="h-6 w-6 text-wastewise-green" />,
      items: ["Geolocation matching", "SMS/Email alerts", "Pickup scheduling", "Donation history"]
    },
    {
      title: "Tax Compliance",
      description: "Automatically generate tax forms and compliance documentation for your donations.",
      icon: <BadgeCheck className="h-6 w-6 text-wastewise-green" />,
      items: ["Auto-filled tax forms", "Audit-ready reports", "Digital receipts", "Compliance tracking"]
    },
    {
      title: "Analytics & Insights",
      description: "Visualize your impact with comprehensive analytics dashboards and predictive insights.",
      icon: <DollarSign className="h-6 w-6 text-wastewise-green" />,
      items: ["Cost savings dashboard", "Waste reduction metrics", "CO2 impact visualization", "Predictive analytics"]
    }
  ];
  
  const statsData = [
    { value: '$162B', label: 'Lost annually to food waste', icon: <AlertTriangle className="h-5 w-5 text-wastewise-green" /> },
    { value: '40%', label: 'Of food produced is wasted', icon: <Leaf className="h-5 w-5 text-wastewise-green" /> },
    { value: '8%', label: 'Of greenhouse emissions from food waste', icon: <Globe className="h-5 w-5 text-wastewise-green" /> }
  ];

  return (
    <div className="min-h-screen bg-wastewise-cream overflow-hidden">
      <Navbar />

      {/* Hero Section with Animation */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-screen flex items-center pt-24 pb-16 px-6 overflow-hidden"
        style={{ opacity: heroOpacity, y: heroY }}
      >
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-wastewise-light-green/10 blur-3xl"></div>
          <div className="absolute top-[60%] -left-[10%] w-[50%] h-[50%] rounded-full bg-wastewise-green/10 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="order-2 lg:order-1"
            >
              <div className="bg-wastewise-green/10 text-wastewise-dark-green rounded-full px-4 py-1 text-sm font-medium inline-block mb-6">
                Eliminate Food Waste, Maximize Profits
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-wastewise-dark-gray leading-tight">
                Turn Food Waste into <span className="text-wastewise-green">Impact</span>
              </h1>
              <p className="text-wastewise-gray text-lg md:text-xl mb-8 max-w-lg">
                WasteWise helps restaurants, supermarkets, and food distributors track, 
                manage, and reduce food waste while automating donations and generating 
                tax-compliant reports.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact" 
                  className="btn-primary flex items-center justify-center gap-2"
                >
                  Get Early Access <ArrowRight size={18} />
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#how-it-works" 
                  className="btn-secondary flex items-center justify-center"
                >
                  How It Works
                </motion.a>
              </div>
            </motion.div>

            <div className="order-1 lg:order-2 relative">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-10"
              >
                <div className="glass-panel p-6 rounded-2xl shadow-lg">
                  <div className="absolute -top-4 -right-4 bg-wastewise-green text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                    Live Dashboard
                  </div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-bold text-wastewise-dark-gray">WasteWise Analytics</h3>
                      <p className="text-wastewise-gray text-sm">Monthly Impact Report</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-wastewise-green/10 p-4 rounded-xl">
                      <p className="text-wastewise-gray text-xs mb-1">Cost Savings</p>
                      <p className="text-wastewise-dark-green text-xl font-bold">$3,240</p>
                      <div className="text-wastewise-green text-xs mt-1">↑ 28% vs last month</div>
                    </div>
                    <div className="bg-wastewise-light-green/10 p-4 rounded-xl">
                      <p className="text-wastewise-gray text-xs mb-1">Waste Reduction</p>
                      <p className="text-wastewise-dark-green text-xl font-bold">612 kg</p>
                      <div className="text-wastewise-green text-xs mt-1">↑ 14% vs last month</div>
                    </div>
                    <div className="bg-wastewise-green/10 p-4 rounded-xl">
                      <p className="text-wastewise-gray text-xs mb-1">Meals Donated</p>
                      <p className="text-wastewise-dark-green text-xl font-bold">1,450</p>
                      <div className="text-wastewise-green text-xs mt-1">↑ 35% vs last month</div>
                    </div>
                    <div className="bg-wastewise-light-green/10 p-4 rounded-xl">
                      <p className="text-wastewise-gray text-xs mb-1">CO² Avoided</p>
                      <p className="text-wastewise-dark-green text-xl font-bold">1.2 tons</p>
                      <div className="text-wastewise-green text-xs mt-1">↑ 22% vs last month</div>
                    </div>
                  </div>
                  <div className="h-32 bg-wastewise-beige rounded-lg flex items-center justify-center">
                    <div className="text-wastewise-gray text-xs">Interactive Analytics Chart</div>
                  </div>
                </div>
              </motion.div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-wastewise-light-green/20 rounded-full blur-3xl z-0"></div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <div className="bg-wastewise-green/10 text-wastewise-dark-green rounded-full px-4 py-1 text-sm font-medium inline-block mb-4">
              The Food Waste Crisis
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-wastewise-dark-gray">
              Why Food Waste Management Matters
            </h2>
            <p className="text-wastewise-gray text-lg max-w-2xl mx-auto">
              Food waste is a global environmental and economic challenge, but also a significant opportunity for businesses.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="glass-panel p-8 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-wastewise-green/10 flex items-center justify-center mx-auto mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold text-wastewise-dark-green mb-2">{stat.value}</h3>
                <p className="text-wastewise-gray">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="glass-panel p-8 rounded-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-wastewise-dark-green mb-4">The Economics of Food Waste</h3>
                <p className="text-wastewise-gray mb-4">
                  For every $1 invested in food waste reduction, businesses can see a return of $7 in operating cost savings.
                </p>
                <p className="text-wastewise-gray mb-6">
                  WasteWise helps you capture this value through intelligent tracking, donation management, and tax incentives.
                </p>
                <Button 
                  onClick={() => navigate('/pricing')} 
                  className="bg-wastewise-green hover:bg-wastewise-dark-green text-white"
                >
                  View Pricing
                </Button>
              </div>
              <div className="bg-wastewise-light-green/10 p-6 rounded-xl">
                <h4 className="font-bold text-wastewise-dark-green mb-3">Business Impact</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-wastewise-green mt-0.5" />
                    <div>
                      <span className="font-medium text-wastewise-dark-gray">30% reduction</span>
                      <p className="text-sm text-wastewise-gray">in food waste costs within 3 months</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-wastewise-green mt-0.5" />
                    <div>
                      <span className="font-medium text-wastewise-dark-gray">$3,000+ savings</span>
                      <p className="text-sm text-wastewise-gray">average monthly for mid-sized restaurants</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-wastewise-green mt-0.5" />
                    <div>
                      <span className="font-medium text-wastewise-dark-gray">Tax benefits</span>
                      <p className="text-sm text-wastewise-gray">through donation documentation automation</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-wastewise-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <div className="bg-wastewise-green/10 text-wastewise-dark-green rounded-full px-4 py-1 text-sm font-medium inline-block mb-4">
              Powerful Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-wastewise-dark-gray">
              Complete food waste management platform
            </h2>
            <p className="text-wastewise-gray text-lg max-w-2xl mx-auto">
              From tracking to donating to reporting, we've got you covered with these powerful features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuresData.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="glass-panel p-8"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-wastewise-green/10 flex items-center justify-center shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-wastewise-dark-green">{feature.title}</h3>
                    <p className="text-wastewise-gray">{feature.description}</p>
                  </div>
                </div>
                <ul className="grid grid-cols-2 gap-2 mt-4">
                  {feature.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-wastewise-green" />
                      <span className="text-sm text-wastewise-gray">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <div className="bg-wastewise-green/10 text-wastewise-dark-green rounded-full px-4 py-1 text-sm font-medium inline-block mb-4">
              How It Works
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-wastewise-dark-gray">
              Turning food waste into impact has never been easier
            </h2>
            <p className="text-wastewise-gray text-lg max-w-2xl mx-auto">
              Our platform makes it simple to track, manage, and reduce food waste while automating donations and compliance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="glass-panel p-6 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-wastewise-green text-white flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Connect Your Systems</h3>
              <p className="text-wastewise-gray">
                Integrate with your POS or inventory system, or use our standalone tools to track waste.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="glass-panel p-6 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-wastewise-green text-white flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Log and Manage Waste</h3>
              <p className="text-wastewise-gray">
                Track waste through barcode scans or manual entry, and get AI-powered surplus predictions.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
              className="glass-panel p-6 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-wastewise-green text-white flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Create Impact</h3>
              <p className="text-wastewise-gray">
                Donate surplus food, track your environmental impact, and maximize tax benefits.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 px-6 bg-wastewise-dark-green text-white">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to reduce food waste and increase profits?</h2>
          <p className="text-lg mb-8 opacity-90">
            Get early access to WasteWise and start turning your food waste challenge into an opportunity.
          </p>
          
          <form onSubmit={handleEarlyAccess} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Label htmlFor="email" className="sr-only">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border-wastewise-light-green placeholder:text-white/50 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button type="submit" className="bg-white text-wastewise-dark-green hover:bg-wastewise-light-green hover:text-white">
                Get Early Access <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </form>
          
          <div className="mt-8 opacity-75 text-sm">
            <p>Demo login available for testing:</p>
            <p>Email: demo@wastewise.com | Password: demo123</p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
