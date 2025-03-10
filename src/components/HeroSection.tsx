
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip
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
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (heroRef.current) {
        // Create a parallax effect
        heroRef.current.style.transform = `translateY(${scrollPosition * 0.2}px)`;
      }
    };

    // Add 3D effect to the chart on load
    if (chartRef.current) {
      chartRef.current.style.transform = 'perspective(1000px) rotateX(5deg)';
      chartRef.current.style.transition = 'transform 0.5s ease-out';
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChartHover = (isHovered: boolean) => {
    if (chartRef.current) {
      chartRef.current.style.transform = isHovered 
        ? 'perspective(1000px) rotateX(0deg) scale(1.02)' 
        : 'perspective(1000px) rotateX(5deg) scale(1)';
    }
  };

  return (
    <section className="relative min-h-screen flex items-center py-24 px-6 overflow-hidden">
      {/* Abstract background shapes with animation */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-wastewise-light-green/10 blur-3xl animate-pulse-light"></div>
        <div className="absolute top-[60%] -left-[10%] w-[50%] h-[50%] rounded-full bg-wastewise-green/10 blur-3xl animate-pulse-light" style={{ animationDelay: '2s' }}></div>
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
              <a href="#contact" className="btn-primary flex items-center justify-center gap-2 transform transition-transform hover:scale-105">
                Get Early Access <ArrowRight size={18} />
              </a>
              <a href="#how-it-works" className="btn-secondary flex items-center justify-center transform transition-transform hover:scale-105">
                How It Works
              </a>
            </div>
            <div className="mt-10 flex items-center text-wastewise-gray">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-wastewise-light-green flex items-center justify-center text-white text-xs animate-float" style={{ animationDelay: '0s' }}>
                  40%
                </div>
                <div className="w-8 h-8 rounded-full bg-wastewise-green flex items-center justify-center text-white text-xs animate-float" style={{ animationDelay: '0.5s' }}>
                  $1T
                </div>
                <div className="w-8 h-8 rounded-full bg-wastewise-dark-green flex items-center justify-center text-white text-xs animate-float" style={{ animationDelay: '1s' }}>
                  CO2
                </div>
              </div>
              <p className="ml-4 text-sm">
                Join 200+ businesses fighting food waste and saving money
              </p>
            </div>
          </div>

          <div ref={heroRef} className="order-1 lg:order-2 relative">
            <div 
              ref={chartRef} 
              className="glass-panel p-6 rounded-2xl shadow-lg animate-fade-in"
              onMouseEnter={() => handleChartHover(true)}
              onMouseLeave={() => handleChartHover(false)}
              style={{ transition: 'transform 0.5s ease-out' }}
            >
              <div className="absolute -top-4 -right-4 bg-wastewise-green text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                Live Dashboard
              </div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-wastewise-dark-gray">Minimalistic Analytics</h3>
                  <p className="text-wastewise-gray text-sm">Monthly Impact Report</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-wastewise-green/10 p-4 rounded-xl transform transition-transform hover:scale-105 duration-300">
                  <p className="text-wastewise-gray text-xs mb-1">Cost Savings</p>
                  <p className="text-wastewise-dark-green text-xl font-bold">$3,240</p>
                  <div className="text-wastewise-green text-xs mt-1">↑ 28% vs last month</div>
                </div>
                <div className="bg-wastewise-light-green/10 p-4 rounded-xl transform transition-transform hover:scale-105 duration-300">
                  <p className="text-wastewise-gray text-xs mb-1">Waste Reduction</p>
                  <p className="text-wastewise-dark-green text-xl font-bold">612 kg</p>
                  <div className="text-wastewise-green text-xs mt-1">↑ 14% vs last month</div>
                </div>
                <div className="bg-wastewise-green/10 p-4 rounded-xl transform transition-transform hover:scale-105 duration-300">
                  <p className="text-wastewise-gray text-xs mb-1">Meals Donated</p>
                  <p className="text-wastewise-dark-green text-xl font-bold">1,450</p>
                  <div className="text-wastewise-green text-xs mt-1">↑ 35% vs last month</div>
                </div>
                <div className="bg-wastewise-light-green/10 p-4 rounded-xl transform transition-transform hover:scale-105 duration-300">
                  <p className="text-wastewise-gray text-xs mb-1">CO² Avoided</p>
                  <p className="text-wastewise-dark-green text-xl font-bold">1.2 tons</p>
                  <div className="text-wastewise-green text-xs mt-1">↑ 22% vs last month</div>
                </div>
              </div>
              <div className="h-32 bg-wastewise-beige rounded-lg overflow-hidden">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={analyticsData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 8, fill: '#757575' }} 
                    />
                    <YAxis hide={true} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                        borderRadius: '4px', 
                        fontSize: 10, 
                        padding: '8px' 
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="waste" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="saved" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
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
