
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid
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

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
