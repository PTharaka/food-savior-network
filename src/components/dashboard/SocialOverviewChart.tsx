
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, Calendar } from 'lucide-react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area
} from 'recharts';

// Enhanced waste reduction metrics data
const wasteReductionData = [
  { name: 'Jan', foodWaste: 180, composted: 40, donated: 15, goal: 130 },
  { name: 'Feb', foodWaste: 170, composted: 45, donated: 20, goal: 130 },
  { name: 'Mar', foodWaste: 160, composted: 50, donated: 25, goal: 130 },
  { name: 'Apr', foodWaste: 150, composted: 55, donated: 30, goal: 130 },
  { name: 'May', foodWaste: 140, composted: 60, donated: 35, goal: 130 },
  { name: 'Jun', foodWaste: 130, composted: 65, donated: 40, goal: 130 },
  { name: 'Jul', foodWaste: 120, composted: 70, donated: 45, goal: 130 },
  { name: 'Aug', foodWaste: 110, composted: 75, donated: 50, goal: 130 },
  { name: 'Sep', foodWaste: 100, composted: 80, donated: 55, goal: 130 },
  { name: 'Oct', foodWaste: 90, composted: 85, donated: 60, goal: 130 },
  { name: 'Nov', foodWaste: 80, composted: 90, donated: 65, goal: 130 },
  { name: 'Dec', foodWaste: 70, composted: 95, donated: 70, goal: 130 },
];

// Custom tooltip to display values in a more readable format
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 shadow-sm rounded-lg">
        <p className="font-semibold text-gray-800">{label}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center my-1">
            <div 
              className="h-3 w-3 rounded-full mr-2" 
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-sm">
              {entry.name}: <span className="font-medium">{entry.value} kg</span>
            </span>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

const SocialOverviewChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState('Year');
  
  return (
    <Card className="border border-gray-200 mb-6">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">Waste Reduction Overview</CardTitle>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="text-xs h-8 flex items-center gap-2">
            <Calendar className="h-3 w-3" />
            <span>Jan - Dec 2024</span>
            <ChevronDown className="h-3 w-3" />
          </Button>
          <Button variant="outline" size="sm" className="text-xs h-8">
            {timeRange} <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={wasteReductionData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                stroke="#888" 
                fontSize={12} 
                axisLine={{ stroke: '#e5e7eb' }}
                tickLine={false}
              />
              <YAxis 
                stroke="#888" 
                fontSize={12}
                axisLine={{ stroke: '#e5e7eb' }}
                tickLine={false}
                tickFormatter={(value) => `${value}kg`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                iconType="circle"
                iconSize={8}
              />
              <Area 
                type="monotone" 
                dataKey="composted" 
                name="Composted" 
                fill="rgba(16, 185, 129, 0.2)" 
                stroke="#10b981" 
                strokeWidth={2} 
              />
              <Bar 
                dataKey="donated" 
                name="Donated" 
                fill="#3b82f6" 
                radius={[4, 4, 0, 0]} 
                barSize={20}
              />
              <Line 
                type="monotone" 
                dataKey="foodWaste" 
                name="Food Waste" 
                stroke="#ef4444" 
                strokeWidth={2} 
                dot={{ stroke: '#ef4444', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="goal" 
                name="Waste Goal" 
                stroke="#94a3b8" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-wastewise-light-beige p-3 rounded-lg border border-wastewise-light-gray/20">
            <p className="text-xs text-wastewise-gray mb-1">Total Food Waste</p>
            <p className="text-xl font-bold text-wastewise-dark-green">1,500 kg</p>
            <p className="text-xs text-wastewise-green">↓ 38% vs. last year</p>
          </div>
          
          <div className="bg-wastewise-light-beige p-3 rounded-lg border border-wastewise-light-gray/20">
            <p className="text-xs text-wastewise-gray mb-1">Total Composted</p>
            <p className="text-xl font-bold text-wastewise-dark-green">805 kg</p>
            <p className="text-xs text-wastewise-green">↑ 42% vs. last year</p>
          </div>
          
          <div className="bg-wastewise-light-beige p-3 rounded-lg border border-wastewise-light-gray/20">
            <p className="text-xs text-wastewise-gray mb-1">Total Donated</p>
            <p className="text-xl font-bold text-wastewise-dark-green">510 kg</p>
            <p className="text-xs text-wastewise-green">↑ 67% vs. last year</p>
          </div>
          
          <div className="bg-wastewise-light-beige p-3 rounded-lg border border-wastewise-light-gray/20">
            <p className="text-xs text-wastewise-gray mb-1">Diversion Rate</p>
            <p className="text-xl font-bold text-wastewise-dark-green">87%</p>
            <p className="text-xs text-wastewise-green">↑ 12% vs. last year</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialOverviewChart;
