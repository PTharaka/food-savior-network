
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

// Sample data for interactive demo
const monthlyData = [
  { name: 'Jan', waste: 120, saved: 30, donated: 25 },
  { name: 'Feb', waste: 115, saved: 35, donated: 30 },
  { name: 'Mar', waste: 110, saved: 40, donated: 40 },
  { name: 'Apr', waste: 105, saved: 45, donated: 45 },
  { name: 'May', waste: 100, saved: 50, donated: 50 },
  { name: 'Jun', waste: 95, saved: 55, donated: 60 },
];

const MetricCard = ({ title, value, change, icon }: { title: string; value: string; change: string; icon: string }) => (
  <div className="bg-wastewise-light-beige p-4 rounded-lg border border-wastewise-light-gray/20">
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
);

const InteractiveAnalyticsDemo: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
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
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={monthlyData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
                <linearGradient id="colorDonated" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Area 
                type="monotone" 
                dataKey="waste" 
                name="Food Waste (kg)" 
                stroke="#ef4444" 
                fillOpacity={1} 
                fill="url(#colorWaste)" 
              />
              <Area 
                type="monotone" 
                dataKey="saved" 
                name="Waste Saved (kg)" 
                stroke="#10b981" 
                fillOpacity={1} 
                fill="url(#colorSaved)" 
              />
              <Area 
                type="monotone" 
                dataKey="donated" 
                name="Food Donated (kg)" 
                stroke="#3b82f6" 
                fillOpacity={1} 
                fill="url(#colorDonated)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default InteractiveAnalyticsDemo;
