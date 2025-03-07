
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { useSubscription } from '@/contexts/SubscriptionContext';

// Sample data for charts
const wasteByTypeData = [
  { name: 'Produce', waste: 245, value: 245, fill: '#8BC34A' },
  { name: 'Bakery', waste: 180, value: 180, fill: '#CDDC39' },
  { name: 'Dairy', waste: 120, value: 120, fill: '#4CAF50' },
  { name: 'Meat', waste: 90, value: 90, fill: '#2E7D32' },
  { name: 'Prepared', waste: 110, value: 110, fill: '#BDBDBD' },
];

const monthlyTrendsData = [
  { month: 'Jan', waste: 320, donations: 180, savings: 720 },
  { month: 'Feb', waste: 300, donations: 200, savings: 680 },
  { month: 'Mar', waste: 290, donations: 230, savings: 650 },
  { month: 'Apr', waste: 270, donations: 250, savings: 600 },
  { month: 'May', waste: 260, donations: 260, savings: 580 },
  { month: 'Jun', waste: 240, donations: 290, savings: 540 },
  { month: 'Jul', waste: 210, donations: 320, savings: 480 },
  { month: 'Aug', waste: 180, donations: 350, savings: 420 },
  { month: 'Sep', waste: 170, donations: 360, savings: 400 },
];

const COLORS = ['#4CAF50', '#8BC34A', '#CDDC39', '#2E7D32', '#C5E1A5'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-wastewise-light-gray rounded-md shadow-sm">
        <p className="font-medium">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const AdvancedCharts: React.FC = () => {
  const { isFeatureAvailable } = useSubscription();
  const hasAdvancedAnalytics = isFeatureAvailable('advancedAnalytics');

  if (!hasAdvancedAnalytics) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Advanced Analytics</CardTitle>
          <CardDescription>
            Upgrade your plan to access detailed analytics and insights
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <div className="text-wastewise-gray text-center max-w-md">
            <p className="mb-4">Advanced analytics help you identify waste patterns, optimize inventory, and maximize donation impact.</p>
            <p className="mb-6">Available on Starter plan and above.</p>
            <button className="btn-primary">Upgrade Now</button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Waste by Category</CardTitle>
            <CardDescription>
              Distribution of waste across different food categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={wasteByTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {wasteByTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Cost Savings Trend</CardTitle>
            <CardDescription>
              Monthly financial impact from waste reduction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrendsData}>
                  <defs>
                    <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4CAF50" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="savings" 
                    name="Savings ($)" 
                    stroke="#4CAF50" 
                    fillOpacity={1} 
                    fill="url(#colorSavings)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Waste vs. Donations</CardTitle>
            <CardDescription>
              Comparison of waste amounts and donations over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="waste" name="Waste (kg)" fill="#FF9800" />
                  <Bar dataKey="donations" name="Donations (kg)" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Waste Reduction Progress</CardTitle>
            <CardDescription>
              Monthly waste volumes showing reduction trend
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="waste" 
                    name="Waste (kg)" 
                    stroke="#FF9800" 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdvancedCharts;
