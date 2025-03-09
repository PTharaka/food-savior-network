
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// Sample data for the hero analytics chart
const analyticsData = [
  { name: 'Jan', waste: 40, saved: 24 },
  { name: 'Feb', waste: 38, saved: 26 },
  { name: 'Mar', waste: 35, saved: 29 },
  { name: 'Apr', waste: 32, saved: 32 },
  { name: 'May', waste: 28, saved: 36 },
  { name: 'Jun', waste: 25, saved: 40 },
];

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (heroRef.current) {
        // Create a parallax effect
        heroRef.current.style.transform = `translateY(${scrollPosition * 0.2}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center py-24 px-6 overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-wastewise-light-green/10 blur-3xl"></div>
        <div className="absolute top-[60%] -left-[10%] w-[50%] h-[50%] rounded-full bg-wastewise-green/10 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 animate-fade-in-up">
            <div className="bg-wastewise-green/10 text-wastewise-dark-green rounded-full px-4 py-1 text-sm font-medium inline-block mb-6">
              The Future of Food Waste Management
            </div>
            <h1 className="heading-xl mb-6 text-wastewise-dark-gray">
              Turn Food Waste into Savings and Social Good
            </h1>
            <p className="text-wastewise-gray text-lg md:text-xl mb-8 max-w-lg">
              WasteWise helps restaurants, supermarkets, and food distributors track, 
              manage, and reduce food waste while automating donations and generating 
              tax-compliant reports.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="btn-primary flex items-center justify-center gap-2">
                Get Early Access <ArrowRight size={18} />
              </a>
              <a href="#how-it-works" className="btn-secondary flex items-center justify-center">
                How It Works
              </a>
            </div>
            <div className="mt-10 flex items-center text-wastewise-gray">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-wastewise-light-green flex items-center justify-center text-white text-xs">
                  40%
                </div>
                <div className="w-8 h-8 rounded-full bg-wastewise-green flex items-center justify-center text-white text-xs">
                  $1T
                </div>
                <div className="w-8 h-8 rounded-full bg-wastewise-dark-green flex items-center justify-center text-white text-xs">
                  CO2
                </div>
              </div>
              <p className="ml-4 text-sm">
                Join 200+ businesses fighting food waste and saving money
              </p>
            </div>
          </div>

          <div ref={heroRef} className="order-1 lg:order-2 relative">
            <div className="glass-panel p-6 rounded-2xl shadow-lg animate-fade-in">
              <div className="absolute -top-4 -right-4 bg-wastewise-green text-white text-xs font-bold px-3 py-1 rounded-full">
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
              <div className="h-32 bg-wastewise-beige rounded-lg">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={analyticsData}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorWaste" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorSaved" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 8 }} />
                    <YAxis hide={true} />
                    <Tooltip contentStyle={{ fontSize: 10 }} />
                    <Area type="monotone" dataKey="waste" stroke="#ef4444" fillOpacity={1} fill="url(#colorWaste)" />
                    <Area type="monotone" dataKey="saved" stroke="#10b981" fillOpacity={1} fill="url(#colorSaved)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
