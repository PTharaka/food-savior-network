
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import PricingSection from '@/components/PricingSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import InteractiveAnalyticsDemo from '@/components/InteractiveAnalyticsDemo';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  Area, 
  AreaChart 
} from 'recharts';

// Sample data for the minimalistic analytics chart
const analyticsData = [
  { name: 'Week 1', waste: 65, recycled: 28, donated: 37 },
  { name: 'Week 2', waste: 59, recycled: 30, donated: 40 },
  { name: 'Week 3', waste: 80, recycled: 36, donated: 45 },
  { name: 'Week 4', waste: 81, recycled: 40, donated: 48 },
  { name: 'Week 5', waste: 56, recycled: 29, donated: 38 },
  { name: 'Week 6', waste: 55, recycled: 33, donated: 43 },
  { name: 'Week 7', waste: 40, recycled: 30, donated: 35 },
];

const Index = () => {
  return (
    <div className="bg-wastewise-cream min-h-screen overflow-hidden">
      <Navbar />
      
      <HeroSection />
      
      <FeaturesSection />
      
      <div className="py-20 bg-wastewise-light-beige">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-wastewise-dark-green mb-4 hover-3d">
              Minimalistic Analytics for Smart Decisions
            </h2>
            <p className="text-lg text-wastewise-gray max-w-2xl mx-auto">
              See your impact at a glance with our intuitive visualization tools. 
              Turn data into actionable insights - no complexity, just clarity.
            </p>
          </div>
          
          <div className="card-3d bg-white p-6 rounded-xl shadow-md border border-wastewise-light-green/20 mb-8 transform hover:scale-[1.02] transition-all duration-300">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-wastewise-dark-green mb-2">Weekly Food Waste Insights</h3>
              <p className="text-wastewise-gray">Track your waste reduction progress with clear, actionable data visualization</p>
            </div>
            
            <div className="h-80 bg-wastewise-cream/30 p-4 rounded-lg">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={analyticsData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      borderRadius: '8px', 
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      border: 'none' 
                    }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="waste" 
                    stackId="1"
                    stroke="#ef4444" 
                    fill="#ef4444" 
                    fillOpacity={0.3}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="recycled" 
                    stackId="1"
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.3}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="donated" 
                    stackId="1"
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.3}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-wastewise-light-green/10 p-4 rounded-lg">
                <p className="text-wastewise-gray text-sm mb-1">Total Waste</p>
                <p className="text-wastewise-dark-green text-2xl font-bold">436 kg</p>
                <p className="text-wastewise-green text-xs">-12% from last month</p>
              </div>
              <div className="bg-wastewise-light-green/10 p-4 rounded-lg">
                <p className="text-wastewise-gray text-sm mb-1">Recycled</p>
                <p className="text-wastewise-dark-green text-2xl font-bold">226 kg</p>
                <p className="text-wastewise-green text-xs">+18% from last month</p>
              </div>
              <div className="bg-wastewise-light-green/10 p-4 rounded-lg">
                <p className="text-wastewise-gray text-sm mb-1">Donated</p>
                <p className="text-wastewise-dark-green text-2xl font-bold">286 kg</p>
                <p className="text-wastewise-green text-xs">+24% from last month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <HowItWorksSection />
      
      <PricingSection />
      
      <ContactSection />
      
      <Footer />
    </div>
  );
};

export default Index;
