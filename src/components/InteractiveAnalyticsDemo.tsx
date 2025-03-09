
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Demo data
const monthlyData = [
  { name: 'Jan', waste: 200, reduced: 150, donated: 50 },
  { name: 'Feb', waste: 190, reduced: 155, donated: 55 },
  { name: 'Mar', waste: 180, reduced: 160, donated: 60 },
  { name: 'Apr', waste: 170, reduced: 165, donated: 65 },
  { name: 'May', waste: 160, reduced: 170, donated: 70 },
  { name: 'Jun', waste: 150, reduced: 175, donated: 75 },
];

const reductionData = [
  { name: 'Food Waste', value: 40 },
  { name: 'Composted', value: 30 },
  { name: 'Donated', value: 20 },
  { name: 'Recycled', value: 10 },
];

const COLORS = ['#ef4444', '#10b981', '#3b82f6', '#f59e0b'];

const impactData = [
  { name: 'Meals', value: 1500 },
  { name: 'CO₂ (kg)', value: 850 },
  { name: 'Water (L)', value: 3200 },
];

const InteractiveAnalyticsDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('waste');

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-wastewise-light-gray/30">
        <div className="p-6">
          <h3 className="text-2xl font-bold text-wastewise-dark-green mb-2">
            Interactive Analytics Dashboard
          </h3>
          <p className="text-wastewise-gray mb-6">
            Visualize your waste reduction impact with our interactive dashboard
          </p>
          
          <Tabs 
            defaultValue="waste" 
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="waste">Waste Tracking</TabsTrigger>
              <TabsTrigger value="distribution">Distribution</TabsTrigger>
              <TabsTrigger value="impact">Community Impact</TabsTrigger>
            </TabsList>
            
            <TabsContent value="waste" className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
                >
                  <defs>
                    <linearGradient id="colorWaste" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorReduced" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorDonated" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '8px', 
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value) => [`${value} kg`, '']}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="waste" 
                    name="Total Waste" 
                    stroke="#ef4444" 
                    fillOpacity={1} 
                    fill="url(#colorWaste)"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="reduced" 
                    name="Waste Reduced" 
                    stroke="#10b981" 
                    fillOpacity={1} 
                    fill="url(#colorReduced)"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="donated" 
                    name="Food Donated" 
                    stroke="#3b82f6" 
                    fillOpacity={1} 
                    fill="url(#colorDonated)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="distribution" className="h-[350px]">
              <div className="grid grid-cols-2 h-full">
                <div>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={reductionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {reductionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Percentage']}
                        contentStyle={{
                          backgroundColor: 'white',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col justify-center space-y-4 pl-6">
                  {reductionData.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div 
                        className="h-4 w-4 rounded-full mr-3" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-wastewise-gray">{item.value}% of total</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="impact" className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={impactData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    tick={{ fontSize: 12 }}
                    width={80}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#10b981" 
                    radius={[0, 4, 4, 0]}
                    barSize={30}
                  >
                    {impactData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="bg-wastewise-light-beige p-6 border-t border-wastewise-light-gray/30">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-wastewise-gray mb-1">Total Food Waste Reduced</p>
              <p className="text-2xl font-bold text-wastewise-dark-green">975 kg</p>
            </div>
            <div>
              <p className="text-sm text-wastewise-gray mb-1">Food Items Donated</p>
              <p className="text-2xl font-bold text-wastewise-dark-green">375 kg</p>
            </div>
            <div>
              <p className="text-sm text-wastewise-gray mb-1">CO₂ Emissions Avoided</p>
              <p className="text-2xl font-bold text-wastewise-dark-green">850 kg</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-8">
        <Button className="bg-wastewise-dark-green hover:bg-wastewise-green text-white">
          Try WasteWise Analytics Today
        </Button>
      </div>
    </div>
  );
};

export default InteractiveAnalyticsDemo;
