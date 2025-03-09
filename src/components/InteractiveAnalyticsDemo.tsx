
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
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

const wasteTypeData = [
  { name: 'Produce', value: 40 },
  { name: 'Bakery', value: 25 },
  { name: 'Dairy', value: 15 },
  { name: 'Meat', value: 10 },
  { name: 'Prepared', value: 10 },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

const impactData = [
  { name: 'Jan', meals: 100, carbon: 0.5, trees: 2 },
  { name: 'Feb', meals: 120, carbon: 0.6, trees: 3 },
  { name: 'Mar', meals: 160, carbon: 0.8, trees: 4 },
  { name: 'Apr', meals: 180, carbon: 0.9, trees: 5 },
  { name: 'May', meals: 200, carbon: 1.0, trees: 6 },
  { name: 'Jun', meals: 240, carbon: 1.2, trees: 7 },
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
  const [activeTab, setActiveTab] = useState('overview');

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

      <Tabs defaultValue="overview" className="w-full">
        <div className="px-6 border-b border-gray-200">
          <TabsList className="h-12">
            <TabsTrigger value="overview" className="data-[state=active]:bg-wastewise-light-green/20 data-[state=active]:text-wastewise-dark-green">Overview</TabsTrigger>
            <TabsTrigger value="waste" className="data-[state=active]:bg-wastewise-light-green/20 data-[state=active]:text-wastewise-dark-green">Waste Types</TabsTrigger>
            <TabsTrigger value="impact" className="data-[state=active]:bg-wastewise-light-green/20 data-[state=active]:text-wastewise-dark-green">Impact</TabsTrigger>
          </TabsList>
        </div>

        <div className="p-6">
          <TabsContent value="overview" className="mt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend verticalAlign="top" height={36} />
                  <Bar dataKey="waste" name="Food Waste (kg)" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="saved" name="Waste Saved (kg)" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="donated" name="Food Donated (kg)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="waste" className="mt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={wasteTypeData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={100} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  <Legend />
                  <Bar dataKey="value" name="Percentage" fill="#10b981" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="impact" className="mt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={impactData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend verticalAlign="top" height={36} />
                  <Bar dataKey="meals" name="Meals Provided" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="carbon" name="Carbon Saved (tons)" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="trees" name="Trees Equivalent" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default InteractiveAnalyticsDemo;
