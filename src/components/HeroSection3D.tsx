
import React, { useEffect, useRef } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HeroSection3D: React.FC = () => {
  const navigateRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (navigateRef.current) {
        navigateRef.current.style.transform = `translateY(${scrollPosition * 0.1}px)`;
      }
      if (globeRef.current) {
        globeRef.current.style.transform = `rotate(${scrollPosition * 0.05}deg)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleScheduleDemo = () => {
    navigate('/pricing');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center py-24 px-6 overflow-hidden">
      {/* Animated 3D Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute -top-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-wastewise-light-green/10 blur-3xl animate-float"></div>
        <div className="absolute top-[20%] -left-[10%] w-[30%] h-[30%] rounded-full bg-wastewise-green/5 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[60%] right-[20%] w-[25%] h-[25%] rounded-full bg-wastewise-green/10 blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating eco elements */}
        <div className="absolute top-[15%] right-[15%] opacity-20">
          <div className="leaf" style={{ transform: 'rotate(45deg) scale(3)', animationDelay: '1s' }}></div>
        </div>
        <div className="absolute top-[40%] left-[10%] opacity-20">
          <div className="leaf" style={{ transform: 'rotate(120deg) scale(2.5)', animationDelay: '2s' }}></div>
        </div>
        <div className="absolute bottom-[20%] right-[30%] opacity-20">
          <div className="leaf" style={{ transform: 'rotate(210deg) scale(4)', animationDelay: '3s' }}></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            className="lg:col-span-7 order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="bg-wastewise-green/10 text-wastewise-dark-green rounded-full px-4 py-1.5 text-sm font-medium inline-block mb-6">
              Sustainable Food Management Platform
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="heading-xl mb-6 text-wastewise-dark-gray font-poppins leading-tight">
              Transform Food Waste Into <span className="text-wastewise-green">Positive Impact</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-wastewise-gray text-lg md:text-xl mb-8 max-w-2xl">
              WasteWise helps businesses cut costs by 30%, claim tax benefits, and reduce environmental impact
              through intelligent food waste management.
            </motion.p>
            
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-wastewise-green/10 p-1 rounded-full">
                  <Check size={18} className="text-wastewise-green" />
                </div>
                <p className="text-wastewise-dark-gray">Save up to $1,000's in reduced waste</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-wastewise-green/10 p-1 rounded-full">
                  <Check size={18} className="text-wastewise-green" />
                </div>
                <p className="text-wastewise-dark-gray">Automate donation logistics</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-wastewise-green/10 p-1 rounded-full">
                  <Check size={18} className="text-wastewise-green" />
                </div>
                <p className="text-wastewise-dark-gray">Get maximum tax deductions</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-wastewise-green/10 p-1 rounded-full">
                  <Check size={18} className="text-wastewise-green" />
                </div>
                <p className="text-wastewise-dark-gray">Simplify regulatory compliance</p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleGetStarted}
                className="btn-primary flex items-center justify-center gap-2"
              >
                Start Free Trial <ArrowRight size={18} />
              </button>
              <button 
                onClick={handleScheduleDemo}
                className="btn-secondary flex items-center justify-center"
              >
                View Pricing
              </button>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mt-10 flex items-center">
              <div className="flex -space-x-4">
                <img src="https://randomuser.me/api/portraits/women/79.jpg" className="w-10 h-10 rounded-full border-2 border-white" alt="User" />
                <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-10 h-10 rounded-full border-2 border-white" alt="User" />
                <img src="https://randomuser.me/api/portraits/women/44.jpg" className="w-10 h-10 rounded-full border-2 border-white" alt="User" />
                <div className="w-10 h-10 rounded-full bg-wastewise-green flex items-center justify-center text-white text-xs border-2 border-white">
                  200+
                </div>
              </div>
              <p className="ml-4 text-sm text-wastewise-gray">
                Join 200+ businesses fighting food waste and saving money
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            ref={navigateRef}
            className="lg:col-span-5 order-1 lg:order-2 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative">
              {/* 3D Globe */}
              <div ref={globeRef} className="absolute -top-20 -right-20 w-40 h-40 opacity-10">
                <div className="w-full h-full rounded-full border-4 border-wastewise-green animate-spin" style={{ animationDuration: '20s' }}></div>
                <div className="absolute inset-4 rounded-full border-4 border-wastewise-light-green animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
                <div className="absolute inset-8 rounded-full border-4 border-wastewise-dark-green animate-spin" style={{ animationDuration: '10s' }}></div>
              </div>
              
              {/* Main Content Card */}
              <div className="glass-panel p-6 rounded-2xl shadow-lg">
                <div className="absolute -top-4 -right-4 bg-wastewise-green text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse-light">
                  Live Dashboard
                </div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-bold text-wastewise-dark-gray">WasteWise Impact</h3>
                    <p className="text-wastewise-gray text-sm">Your Sustainability Results</p>
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
                    <p className="text-wastewise-gray text-xs mb-1">CO₂ Avoided</p>
                    <p className="text-wastewise-dark-green text-xl font-bold">1.2 tons</p>
                    <div className="text-wastewise-green text-xs mt-1">↑ 22% vs last month</div>
                  </div>
                </div>
                
                {/* Chart Visualization */}
                <div className="relative h-36 bg-wastewise-beige rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-end p-2">
                    <div className="w-1/12 h-20% bg-wastewise-green/40 rounded-t"></div>
                    <div className="w-1/12 h-30% bg-wastewise-green/40 rounded-t"></div>
                    <div className="w-1/12 h-25% bg-wastewise-green/40 rounded-t"></div>
                    <div className="w-1/12 h-40% bg-wastewise-green/40 rounded-t"></div>
                    <div className="w-1/12 h-35% bg-wastewise-green/40 rounded-t"></div>
                    <div className="w-1/12 h-45% bg-wastewise-green/40 rounded-t"></div>
                    <div className="w-1/12 h-60% bg-wastewise-green/40 rounded-t"></div>
                    <div className="w-1/12 h-55% bg-wastewise-green/40 rounded-t"></div>
                    <div className="w-1/12 h-70% bg-wastewise-green/40 rounded-t"></div>
                    <div className="w-1/12 h-65% bg-wastewise-green/40 rounded-t"></div>
                    <div className="w-1/12 h-80% bg-wastewise-green/60 rounded-t"></div>
                    <div className="w-1/12 h-90% bg-wastewise-green/80 rounded-t"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-wastewise-gray text-xs">Impact Growth Chart</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection3D;
