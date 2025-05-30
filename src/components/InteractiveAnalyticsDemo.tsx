
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const monthlyData = [
  { name: 'Jan', waste: 120, saved: 30, donated: 25 },
  { name: 'Feb', waste: 115, saved: 35, donated: 30 },
  { name: 'Mar', waste: 110, saved: 40, donated: 40 },
  { name: 'Apr', waste: 105, saved: 45, donated: 45 },
  { name: 'May', waste: 100, saved: 50, donated: 50 },
  { name: 'Jun', waste: 95, saved: 55, donated: 60 },
];

const MetricCard = React.memo(({ title, value, change, icon }: { title: string; value: string; change: string; icon: string }) => (
  <div className="bg-wastewise-light-beige p-4 rounded-lg border border-wastewise-light-gray/20 hover:shadow-md transition-all transform hover:scale-[1.02] duration-300">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-wastewise-gray">{title}</p>
        <p className="text-2xl font-bold text-wastewise-dark-green mt-1">{value}</p>
      </div>
      <div className="bg-wastewise-green/10 h-10 w-10 rounded-full flex items-center justify-center">
        <span className="text-wastewise-green text-xl">{icon}</span>
      </div>
    </div>
    <p className="text-xs text-wastewise-green mt-2">{change}</p>
  </div>
));

MetricCard.displayName = 'MetricCard';

const InteractiveAnalyticsDemo: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          entry.target.classList.add('animate-fade-in');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
      rootMargin: '10px',
    });

    if (chartContainerRef.current) {
      observer.observe(chartContainerRef.current);
    }

    return () => {
      if (chartContainerRef.current) {
        observer.unobserve(chartContainerRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transform transition-all duration-500 hover:shadow-lg"
      style={{ 
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      ref={chartContainerRef}
    >
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
          <div>
            <h3 className="text-xl font-bold text-wastewise-dark-green">WasteWise Analytics</h3>
            <p className="text-wastewise-gray text-sm">Monthly Impact Report</p>
          </div>
          <div className="mt-2 md:mt-0">
            <span className="text-sm text-wastewise-gray">June 2024</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard 
            title="Cost Savings" 
            value="$3,240" 
            change="↑ 28% vs last month" 
            icon="💰" 
          />
          <MetricCard 
            title="Waste Reduction" 
            value="612 kg" 
            change="↑ 14% vs last month" 
            icon="♻️" 
          />
          <MetricCard 
            title="Meals Donated" 
            value="1,450" 
            change="↑ 35% vs last month" 
            icon="🍲" 
          />
          <MetricCard 
            title="CO² Avoided" 
            value="1.2 tons" 
            change="↑ 22% vs last month" 
            icon="🌿" 
          />
        </div>
      </div>

      <div className="p-6">
        <div className="h-80 overflow-hidden">
          {isVisible && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#757575', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#757575', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
                    border: '1px solid #e0e0e0' 
                  }} 
                />
                <Legend 
                  verticalAlign="top" 
                  height={36} 
                  iconType="circle"
                  iconSize={8}
                />
                <Line 
                  type="monotone" 
                  dataKey="waste" 
                  name="Food Waste (kg)" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 0, fill: '#ef4444' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="saved" 
                  name="Waste Saved (kg)" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 0, fill: '#10b981' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="donated" 
                  name="Food Donated (kg)" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 0, fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveAnalyticsDemo;
