
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
  ResponsiveContainer
} from 'recharts';

// Sample data for charts
const socialOverviewData = [
  { name: 'Jul', facebook: 15, instagram: 10, linkedin: 5 },
  { name: 'Aug', facebook: 20, instagram: 15, linkedin: 18 },
  { name: 'Sep', facebook: 25, instagram: 35, linkedin: 20 },
  { name: 'Oct', facebook: 35, instagram: 25, linkedin: 30 },
  { name: 'Nov', facebook: 30, instagram: 30, linkedin: 35 },
  { name: 'Dec', facebook: 38, instagram: 40, linkedin: 42 },
];

const SocialOverviewChart: React.FC = () => {
  return (
    <Card className="border border-gray-200 mb-6">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">My social overview</CardTitle>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="text-xs h-8">
            Jul 2024 - Dec 2024 <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
          <Button variant="outline" size="sm" className="text-xs h-8">
            Engagement <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 h-80">
          <div className="col-span-1 md:col-span-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={socialOverviewData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #f0f0f0' }}
                />
                <Line type="monotone" dataKey="facebook" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="instagram" stroke="#111" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="linkedin" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center space-x-6 mt-2">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-xs text-gray-600">Facebook</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-black mr-2"></div>
                <span className="text-xs text-gray-600">Instagram</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-xs text-gray-600">LinkedIn</span>
              </div>
            </div>
          </div>
          <div className="col-span-1 md:col-span-2">
            <img 
              src="/lovable-uploads/1fd0de91-6c4d-4b28-8fcf-9ba96c793760.png" 
              alt="World map"
              className="w-full h-full object-contain opacity-50"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialOverviewChart;
