
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Check, 
  PackageCheck, 
  PieChart, 
  AlertCircle,
  BarChart,
  FileText,
  Truck,
  Award,
  Menu,
  X,
  Lock,
  Users,
  Settings,
  MessageSquare,
  HelpCircle,
  LogOut,
  Search,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart as BarChartComponent,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as PieChartComponent,
  Pie,
  Cell
} from 'recharts';
import { toast } from "sonner";
import { Input } from '@/components/ui/input';

// Sample data for charts
const socialOverviewData = [
  { name: 'Jul', facebook: 15, instagram: 10, linkedin: 5 },
  { name: 'Aug', facebook: 20, instagram: 15, linkedin: 18 },
  { name: 'Sep', facebook: 25, instagram: 35, linkedin: 20 },
  { name: 'Oct', facebook: 35, instagram: 25, linkedin: 30 },
  { name: 'Nov', facebook: 30, instagram: 30, linkedin: 35 },
  { name: 'Dec', facebook: 38, instagram: 40, linkedin: 42 },
];

const engagementData = [
  { platform: 'Facebook', rate: '5.0%', change: -12.7 },
  { platform: 'Instagram', rate: '12.3%', change: 3.5 },
  { platform: 'LinkedIn', rate: '4.5%', change: -9.7 },
];

const geographiesData = [
  { country: 'United States of America', rate: 65.1 },
  { country: 'Bangladesh', rate: 39.2 },
  { country: 'China', rate: 50.5 },
  { country: 'Australia', rate: 9.2 },
];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const today = new Date();
const calendarDays = daysOfWeek.map((day, index) => {
  const date = new Date(today);
  date.setDate(today.getDate() - today.getDay() + index);
  return {
    day,
    date: date.getDate().toString().padStart(2, '0')
  };
});

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { subscription } = useSubscription();
  const navigate = useNavigate();
  const today = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' } as const;
  const formattedDate = today.toLocaleDateString('en-US', options);

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />
      
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              Welcome, {user.businessName || user.email?.split('@')[0] || 'User'}
            </h1>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                className="pl-9 pr-4 py-2 w-64 bg-gray-50 border-gray-200 focus:bg-white"
                placeholder="Search anything..."
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">/</div>
            </div>
            <button className="relative p-2">
              <span className="sr-only">Notifications</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <Card className="border border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total posts</CardTitle>
                <div className="text-3xl font-bold">224</div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="m5 12 5 5 9-9"></path>
                  </svg>
                  <span>+55% engagement</span>
                  <span className="text-gray-500 ml-1">since last month</span>
                </div>
              </CardHeader>
            </Card>
            
            <Card className="border border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Post likes</CardTitle>
                <div className="text-3xl font-bold">2.4 M</div>
                <div className="flex items-center text-xs text-red-600 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="m19 9-7 7-7-7"></path>
                  </svg>
                  <span>-25% engagement</span>
                  <span className="text-gray-500 ml-1">since last month</span>
                </div>
              </CardHeader>
            </Card>
            
            <Card className="border border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total comments</CardTitle>
                <div className="text-3xl font-bold">3.5 M</div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="m5 12 5 5 9-9"></path>
                  </svg>
                  <span>+15% engagement</span>
                  <span className="text-gray-500 ml-1">since last month</span>
                </div>
              </CardHeader>
            </Card>
          </div>
          
          {/* Social Overview */}
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
              <div className="grid grid-cols-5 gap-6 h-80">
                <div className="col-span-3">
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
                <div className="col-span-2">
                  <img 
                    src="/lovable-uploads/1fd0de91-6c4d-4b28-8fcf-9ba96c793760.png" 
                    alt="World map"
                    className="w-full h-full object-contain opacity-50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Engagement Metrics and Geographies */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <Card className="border border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Engagement rate metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-500 mb-2">Engagement rate (per impression)</div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left font-medium text-gray-500 py-2">Platform</th>
                      <th className="text-right font-medium text-gray-500 py-2">Rate</th>
                      <th className="text-right font-medium text-gray-500 py-2">% Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {engagementData.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 text-gray-800">{item.platform} engagement rate</td>
                        <td className="py-3 text-right text-gray-800">{item.rate}</td>
                        <td className="py-3 text-right">
                          <span className={`flex items-center justify-end ${item.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {item.change > 0 ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                <path d="m5 12 7-7 7 7"></path>
                                <path d="M12 19V5"></path>
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                <path d="M12 5v14"></path>
                                <path d="m19 12-7 7-7-7"></path>
                              </svg>
                            )}
                            {Math.abs(item.change)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Top geographies</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left font-medium text-gray-500 py-2">Country</th>
                      <th className="text-right font-medium text-gray-500 py-2">Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {geographiesData.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 text-gray-800">{item.country}</td>
                        <td className="py-3 text-right">
                          <div className="flex items-center justify-end">
                            <span className="mr-2 text-gray-800">{item.rate}%</span>
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-teal-500 h-2 rounded-full" 
                                style={{ width: `${item.rate}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
          
          {/* Planner and Comments */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="border border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">My post planner</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {calendarDays.map((item, index) => (
                    <div key={index} className={`${index === 0 ? 'bg-gray-100 rounded-md' : ''} p-2`}>
                      <div className="text-xs text-gray-500">{item.day}</div>
                      <div className={`text-sm font-medium ${index === 0 ? 'text-gray-800' : 'text-gray-600'}`}>
                        {item.date}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Comments and mentions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-3 flex mb-2">
                  <div className="h-10 w-10 rounded-full bg-gray-200 mr-3 flex-shrink-0">
                    <img 
                      src="https://ui-avatars.com/api/?name=User&background=random" 
                      alt="User" 
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium mr-1">Monu X</span>
                      <span className="text-xs text-gray-500">@monu_icons</span>
                    </div>
                    <div className="text-sm text-gray-500">Sylhet, Bangladesh</div>
                    <div className="text-xs text-gray-400 mt-1">31 Jan 12:30 AM</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
