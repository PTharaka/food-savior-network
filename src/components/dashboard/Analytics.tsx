
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Share2, Download, Calendar } from 'lucide-react';
import {
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
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

// Sample data for analytics
const costSavingsData = [
  { name: 'Jan', savings: 1200 },
  { name: 'Feb', savings: 1900 },
  { name: 'Mar', savings: 2100 },
  { name: 'Apr', savings: 1700 },
  { name: 'May', savings: 2600 },
  { name: 'Jun', savings: 2300 },
  { name: 'Jul', savings: 3100 },
  { name: 'Aug', savings: 2800 },
  { name: 'Sep', savings: 3450 },
  { name: 'Oct', savings: 3200 },
  { name: 'Nov', savings: 3800 },
  { name: 'Dec', savings: 3450 },
];

const wasteReductionData = [
  { name: 'Jan', reduced: 250 },
  { name: 'Feb', reduced: 320 },
  { name: 'Mar', reduced: 380 },
  { name: 'Apr', reduced: 420 },
  { name: 'May', reduced: 490 },
  { name: 'Jun', reduced: 550 },
  { name: 'Jul', reduced: 620 },
  { name: 'Aug', reduced: 580 },
  { name: 'Sep', reduced: 650 },
  { name: 'Oct', reduced: 700 },
  { name: 'Nov', reduced: 750 },
  { name: 'Dec', reduced: 750 },
];

const mealsDonatedData = [
  { name: 'Jan', meals: 120 },
  { name: 'Feb', meals: 180 },
  { name: 'Mar', meals: 240 },
  { name: 'Apr', meals: 280 },
  { name: 'May', meals: 350 },
  { name: 'Jun', meals: 390 },
  { name: 'Jul', meals: 450 },
  { name: 'Aug', meals: 520 },
  { name: 'Sep', meals: 580 },
  { name: 'Oct', meals: 640 },
  { name: 'Nov', meals: 710 },
  { name: 'Dec', meals: 1240 },
];

const co2ImpactData = [
  { name: 'Jan', impact: 0.2 },
  { name: 'Feb', impact: 0.3 },
  { name: 'Mar', impact: 0.35 },
  { name: 'Apr', impact: 0.4 },
  { name: 'May', impact: 0.5 },
  { name: 'Jun', impact: 0.55 },
  { name: 'Jul', impact: 0.8 },
  { name: 'Aug', impact: 0.9 },
  { name: 'Sep', impact: 1.2 },
  { name: 'Oct', impact: 1.5 },
  { name: 'Nov', impact: 1.7 },
  { name: 'Dec', impact: 1.8 },
];

const wasteDistributionData = [
  { name: 'Produce', value: 35 },
  { name: 'Bakery', value: 25 },
  { name: 'Dairy', value: 15 },
  { name: 'Meat', value: 10 },
  { name: 'Prepared Foods', value: 15 },
];

const wasteDistributionColors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

const trendData = [
  { name: 'Week 1', current: 140, previous: 170 },
  { name: 'Week 2', current: 132, previous: 160 },
  { name: 'Week 3', current: 128, previous: 155 },
  { name: 'Week 4', current: 120, previous: 150 },
  { name: 'Week 5', current: 115, previous: 145 },
  { name: 'Week 6', current: 105, previous: 140 },
  { name: 'Week 7', current: 100, previous: 135 },
  { name: 'Week 8', current: 95, previous: 130 },
];

const impactData = [
  { month: 'Jan', meals: 120, co2: 0.2, trees: 2 },
  { month: 'Feb', meals: 180, co2: 0.3, trees: 3 },
  { month: 'Mar', meals: 240, co2: 0.35, trees: 4 },
  { month: 'Apr', meals: 280, co2: 0.4, trees: 4 },
  { month: 'May', meals: 350, co2: 0.5, trees: 5 },
  { month: 'Jun', meals: 390, co2: 0.55, trees: 6 },
  { month: 'Jul', meals: 450, co2: 0.8, trees: 8 },
  { month: 'Aug', meals: 520, co2: 0.9, trees: 9 },
  { month: 'Sep', meals: 580, co2: 1.2, trees: 12 },
  { month: 'Oct', meals: 640, co2: 1.5, trees: 15 },
  { month: 'Nov', meals: 710, co2: 1.7, trees: 17 },
  { month: 'Dec', meals: 740, co2: 1.8, trees: 18 },
];

const predictionData = [
  { day: 'Mon', actual: 25, predicted: 28 },
  { day: 'Tue', actual: 30, predicted: 32 },
  { day: 'Wed', actual: 28, predicted: 25 },
  { day: 'Thu', actual: 22, predicted: 24 },
  { day: 'Fri', actual: 35, predicted: 33 },
  { day: 'Sat', actual: 40, predicted: 38 },
  { day: 'Sun', actual: 20, predicted: 22 },
];

const AnalyticsPanel = () => {
  const [timeframe, setTimeframe] = useState('year');
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Cost Savings</CardTitle>
          <CardDescription>Total money saved from waste reduction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-wastewise-dark-green mb-2">$3,450</div>
            <div className="text-sm text-wastewise-green">↑ 15% vs. last period</div>
            <div className="w-full h-36 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costSavingsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip formatter={(value) => [`$${value}`, 'Savings']} />
                  <Bar dataKey="savings" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Waste Reduction</CardTitle>
          <CardDescription>Total food waste prevented</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-wastewise-dark-green mb-2">750 kg</div>
            <div className="text-sm text-wastewise-green">↑ 8% vs. last period</div>
            <div className="w-full h-36 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={wasteReductionData}>
                  <defs>
                    <linearGradient id="colorReduced" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `${value} kg`} />
                  <Tooltip formatter={(value) => [`${value} kg`, 'Reduced']} />
                  <Area type="monotone" dataKey="reduced" stroke="#3b82f6" fillOpacity={1} fill="url(#colorReduced)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Meals Donated</CardTitle>
          <CardDescription>Estimated meals provided through donations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-wastewise-dark-green mb-2">1,240</div>
            <div className="text-sm text-wastewise-green">↑ 22% vs. last period</div>
            <div className="w-full h-36 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mealsDonatedData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip formatter={(value) => [`${value} meals`, 'Donated']} />
                  <Line type="monotone" dataKey="meals" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">CO₂ Impact</CardTitle>
          <CardDescription>Environmental impact of your waste reduction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-wastewise-dark-green mb-2">1.8 tons</div>
            <div className="text-sm text-wastewise-green">↑ 12% vs. last period</div>
            <div className="w-full h-36 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={wasteDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {wasteDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={wasteDistributionColors[index % wasteDistributionColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-wastewise-dark-gray">Analytics Dashboard</h2>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar size={16} />
            <span>Jan 1 - Dec 31, 2024</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 size={16} /> Share Report
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} /> Export Data
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="impact">Impact</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <AnalyticsPanel />
          
          <Card>
            <CardHeader>
              <CardTitle>Waste Distribution</CardTitle>
              <CardDescription>
                Analysis of waste types and categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={wasteDistributionData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    <Legend />
                    <Bar dataKey="value" name="Percentage" fill="#10b981" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Waste Trends</CardTitle>
              <CardDescription>
                Historical waste data and patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `${value} kg`} />
                    <Tooltip formatter={(value) => [`${value} kg`, 'Waste']} />
                    <Legend />
                    <Line type="monotone" dataKey="current" name="Current Period" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey="previous" name="Previous Period" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact">
          <Card>
            <CardHeader>
              <CardTitle>Community Impact</CardTitle>
              <CardDescription>
                Social and environmental impact metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={impactData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="meals" name="Meals Provided" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="left" dataKey="trees" name="Trees Saved" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="right" dataKey="co2" name="CO₂ Prevented (tons)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions">
          <Card>
            <CardHeader>
              <CardTitle>Waste Predictions</CardTitle>
              <CardDescription>
                AI-powered forecasts for inventory optimization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={predictionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis tickFormatter={(value) => `${value} kg`} />
                    <Tooltip formatter={(value) => [`${value} kg`, 'Waste']} />
                    <Legend />
                    <Bar dataKey="actual" name="Actual Waste" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="predicted" name="Predicted Waste" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
