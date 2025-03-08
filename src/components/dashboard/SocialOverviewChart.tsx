
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown } from 'lucide-react';
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

// Sample data for waste reduction metrics
const wasteReductionData = [
  { name: 'Jul', foodWaste: 150, composted: 65, donated: 35 },
  { name: 'Aug', foodWaste: 135, composted: 70, donated: 45 },
  { name: 'Sep', foodWaste: 120, composted: 80, donated: 55 },
  { name: 'Oct', foodWaste: 110, composted: 75, donated: 60 },
  { name: 'Nov', foodWaste: 90, composted: 85, donated: 70 },
  { name: 'Dec', foodWaste: 75, composted: 90, donated: 80 },
];

const SocialOverviewChart: React.FC = () => {
  return (
    <Card className="border border-gray-200 mb-6">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">Waste Reduction Overview</CardTitle>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="text-xs h-8">
            Jul 2024 - Dec 2024 <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
          <Button variant="outline" size="sm" className="text-xs h-8">
            All metrics <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={wasteReductionData}
              margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #f0f0f0' }}
              />
              <Legend verticalAlign="bottom" height={36} />
              <Line type="monotone" dataKey="foodWaste" name="Food Waste (kg)" stroke="#ef4444" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="composted" name="Composted (kg)" stroke="#10b981" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="donated" name="Donated (kg)" stroke="#3b82f6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center space-x-6 mt-4">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
            <span className="text-xs text-gray-600">Food Waste</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-xs text-gray-600">Composted</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-xs text-gray-600">Donated</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialOverviewChart;
