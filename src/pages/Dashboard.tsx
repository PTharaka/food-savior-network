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
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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

// Sample data for charts
const wasteData = [
  { name: 'Mon', waste: 20 },
  { name: 'Tue', waste: 15 },
  { name: 'Wed', waste: 25 },
  { name: 'Thu', waste: 22 },
  { name: 'Fri', waste: 30 },
  { name: 'Sat', waste: 28 },
  { name: 'Sun', waste: 15 },
];

const monthlyData = [
  { name: 'Jan', waste: 200, donations: 120 },
  { name: 'Feb', waste: 180, donations: 132 },
  { name: 'Mar', waste: 190, donations: 145 },
  { name: 'Apr', waste: 170, donations: 150 },
  { name: 'May', waste: 160, donations: 142 },
  { name: 'Jun', waste: 150, donations: 130 },
];

const wasteTypeData = [
  { name: 'Produce', value: 35 },
  { name: 'Dairy', value: 20 },
  { name: 'Bakery', value: 25 },
  { name: 'Meat', value: 10 },
  { name: 'Others', value: 10 },
];

const COLORS = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFC107', '#FF9800'];

// Feature menu items with subscription requirements
const featureMenuItems = [
  { 
    id: 'waste-tracking', 
    name: 'Waste Tracking', 
    icon: <BarChart className="h-5 w-5 text-wastewise-green" />,
    requiredTier: 'free',
    description: 'Track and manage your food waste'
  },
  { 
    id: 'donations', 
    name: 'Donation Management', 
    icon: <PackageCheck className="h-5 w-5 text-wastewise-green" />,
    requiredTier: 'free',
    description: 'Connect with food banks and manage donations'
  },
  { 
    id: 'analytics', 
    name: 'Advanced Analytics', 
    icon: <PieChart className="h-5 w-5 text-wastewise-green" />,
    requiredTier: 'starter',
    description: 'In-depth analytics and reporting'
  },
  { 
    id: 'tax-compliance', 
    name: 'Tax Compliance', 
    icon: <FileText className="h-5 w-5 text-wastewise-green" />,
    requiredTier: 'pro',
    description: 'Automated tax forms and compliance tools'
  },
  { 
    id: 'pos-integration', 
    name: 'POS Integrations', 
    icon: <Truck className="h-5 w-5 text-wastewise-green" />,
    requiredTier: 'starter',
    description: 'Connect with your point of sale systems'
  },
  { 
    id: 'gamification', 
    name: 'Staff Gamification', 
    icon: <Award className="h-5 w-5 text-wastewise-green" />,
    requiredTier: 'starter',
    description: 'Engage your staff with achievements and rewards'
  },
];

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { subscription, isFeatureAvailable, isReachingLimit, getRemainingEntries, upgradeTier } = useSubscription();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    navigate('/login');
    return null;
  }

  // Determine if we need to show upgrade alerts
  const showWasteEntriesAlert = isReachingLimit('entries') && subscription.tier !== 'enterprise';
  
  // Check if a feature is available for the current subscription tier
  const canAccessFeature = (requiredTier: string) => {
    const tierLevels = { 'free': 0, 'starter': 1, 'pro': 2, 'enterprise': 3 };
    return tierLevels[subscription.tier] >= tierLevels[requiredTier];
  };

  // Handle clicking on a locked feature
  const handleLockedFeatureClick = (feature: any) => {
    toast.error(
      <div>
        <p className="font-semibold">Feature Locked</p>
        <p className="text-sm">This feature requires the {feature.requiredTier.charAt(0).toUpperCase() + feature.requiredTier.slice(1)} plan or higher.</p>
      </div>,
      {
        action: {
          label: "Upgrade",
          onClick: () => navigate("/pricing")
        }
      }
    );
  };

  return (
    <div className="min-h-screen bg-wastewise-cream">
      <Navbar />
      <div className="container mx-auto py-12 px-6">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="heading-xl font-poppins text-wastewise-dark-gray">
                Welcome back, {user.businessName || user.email}!
              </h1>
              <p className="text-wastewise-gray text-lg">
                Here's a snapshot of your WasteWise dashboard.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Badge 
                className={`
                  ${subscription.tier === 'free' ? 'bg-wastewise-light-gray/50 text-wastewise-dark-gray' : ''} 
                  ${subscription.tier === 'starter' ? 'bg-wastewise-light-green text-wastewise-dark-green' : ''}
                  ${subscription.tier === 'pro' ? 'bg-wastewise-green text-white' : ''}
                  ${subscription.tier === 'enterprise' ? 'bg-wastewise-dark-green text-white' : ''}
                  px-3 py-1.5 text-sm font-medium
                `}
              >
                {subscription.tier.charAt(0).toUpperCase() + subscription.tier.slice(1)} Plan
              </Badge>
              
              {subscription.isTrialing && (
                <Badge variant="outline" className="ml-2 bg-yellow-50 text-yellow-700 border-yellow-200">
                  Trial ends in {new Date(subscription.trialEndsAt || '').toLocaleDateString()}
                </Badge>
              )}
            </div>
          </div>
        </header>

        {showWasteEntriesAlert && (
          <div className="glass-panel border-l-4 border-yellow-400 bg-yellow-50/50 p-4 mb-8 flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-medium text-yellow-700">Approaching Waste Entry Limit</h3>
              <p className="text-yellow-600 text-sm mt-1">
                You've used {subscription.entriesUsed} of your {subscription.features.maxWasteEntries} monthly waste entries.
                Consider upgrading your plan to avoid disruptions.
              </p>
              <Button 
                size="sm" 
                className="mt-2 bg-wastewise-green hover:bg-wastewise-dark-green text-white"
                onClick={() => navigate('/pricing')}
              >
                View Upgrade Options
              </Button>
            </div>
          </div>
        )}

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full md:w-auto grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-wastewise-dark-gray flex items-center gap-2">
                    <PieChart className="mr-2 h-5 w-5 text-wastewise-green" />
                    Waste Reduction
                  </CardTitle>
                  <CardDescription className="text-wastewise-gray">Track your progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-wastewise-dark-green">68%</div>
                  <Progress value={68} className="h-2 bg-wastewise-light-gray/30">
                    <div className="h-full bg-wastewise-green rounded-full" style={{ width: '68%' }} />
                  </Progress>
                  <p className="text-sm text-wastewise-gray mt-2">vs. last month</p>
                </CardContent>
              </Card>

              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-wastewise-dark-gray flex items-center gap-2">
                    <PackageCheck className="mr-2 h-5 w-5 text-wastewise-green" />
                    Donations
                  </CardTitle>
                  <CardDescription className="text-wastewise-gray">Food sent to those in need</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-wastewise-dark-green">234 kg</div>
                  <Progress value={45} className="h-2 bg-wastewise-light-gray/30">
                    <div className="h-full bg-wastewise-green rounded-full" style={{ width: '45%' }} />
                  </Progress>
                  <p className="text-sm text-wastewise-gray mt-2">vs. last month</p>
                </CardContent>
              </Card>

              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-wastewise-dark-gray flex items-center gap-2">
                    <Users className="mr-2 h-5 w-5 text-wastewise-green" />
                    Community Impact
                  </CardTitle>
                  <CardDescription className="text-wastewise-gray">Meals provided</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-wastewise-dark-green">876</div>
                  <Progress value={75} className="h-2 bg-wastewise-light-gray/30">
                    <div className="h-full bg-wastewise-green rounded-full" style={{ width: '75%' }} />
                  </Progress>
                  <p className="text-sm text-wastewise-gray mt-2">vs. last month</p>
                </CardContent>
              </Card>

              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-wastewise-dark-gray flex items-center gap-2">
                    <Check className="mr-2 h-5 w-5 text-wastewise-green" />
                    Tax Benefits
                  </CardTitle>
                  <CardDescription className="text-wastewise-gray">Claimed this year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-wastewise-dark-green">$1,250</div>
                  <Progress value={90} className="h-2 bg-wastewise-light-gray/30">
                    <div className="h-full bg-wastewise-green rounded-full" style={{ width: '90%' }} />
                  </Progress>
                  <p className="text-sm text-wastewise-gray mt-2">vs. last year</p>
                </CardContent>
              </Card>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="glass-panel lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-wastewise-dark-gray">
                    Recent Activity
                  </CardTitle>
                  <CardDescription className="text-wastewise-gray">
                    Latest updates and insights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="divide-y divide-wastewise-light-gray/30">
                    <li className="py-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-wastewise-dark-gray">
                            Donated 50 kg of food to Local Shelter
                          </p>
                          <p className="text-sm text-wastewise-gray">
                            2 hours ago
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-wastewise-green" />
                      </div>
                    </li>
                    <li className="py-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-wastewise-dark-gray">
                            Generated tax report for Q3
                          </p>
                          <p className="text-sm text-wastewise-gray">
                            Yesterday
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-wastewise-green" />
                      </div>
                    </li>
                    <li className="py-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-wastewise-dark-gray">
                            New insights on waste trends
                          </p>
                          <p className="text-sm text-wastewise-gray">
                            3 days ago
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-wastewise-green" />
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-wastewise-dark-gray">
                    Quick Actions
                  </CardTitle>
                  <CardDescription className="text-wastewise-gray">
                    Manage your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <Button variant="secondary" className="justify-start" onClick={() => navigate('/profile')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Account Settings
                  </Button>
                  <Button variant="secondary" className="justify-start">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact Support
                  </Button>
                  <Button variant="secondary" className="justify-start">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Help & FAQs
                  </Button>
                  <Button variant="destructive" className="justify-start" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </CardContent>
              </Card>
            </section>
          </TabsContent>
          
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-wastewise-dark-gray">
                    Weekly Waste Tracking
                  </CardTitle>
                  <CardDescription className="text-wastewise-gray">
                    Past 7 days of food waste (kg)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChartComponent
                        data={wasteData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`${value} kg`, 'Waste']}
                          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px' }}
                        />
                        <Legend />
                        <Bar dataKey="waste" fill="#4CAF50" radius={[4, 4, 0, 0]} />
                      </BarChartComponent>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-wastewise-dark-gray">
                    Waste by Category
                  </CardTitle>
                  <CardDescription className="text-wastewise-gray">
                    Breakdown of waste by food type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChartComponent>
                        <Pie
                          data={wasteTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {wasteTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value} kg`, 'Amount']}
                          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px' }}
                        />
                        <Legend />
                      </PieChartComponent>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="glass-panel mb-6">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-wastewise-dark-gray">
                  Monthly Trends
                </CardTitle>
                <CardDescription className="text-wastewise-gray">
                  Compare waste vs. donations over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`${value} kg`, '']}
                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px' }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="waste" stroke="#FF9800" strokeWidth={2} />
                      <Line type="monotone" dataKey="donations" stroke="#4CAF50" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              {!canAccessFeature('starter') && (
                <CardFooter className="bg-wastewise-light-gray/10 border-t border-wastewise-light-gray/20 px-6 py-4">
                  <div className="flex items-center gap-2 w-full">
                    <Lock className="h-4 w-4 text-wastewise-gray" />
                    <p className="text-sm text-wastewise-gray flex-1">
                      Advanced analytics are available on Starter plan and above
                    </p>
                    <Button 
                      size="sm" 
                      className="bg-wastewise-green hover:bg-wastewise-dark-green"
                      onClick={() => navigate('/pricing')}
                    >
                      Upgrade
                    </Button>
                  </div>
                </CardFooter>
              )}
            </Card>
            
            <div className="text-center text-sm text-wastewise-gray">
              <p>Want to see how your business is doing compared to industry benchmarks?</p>
              <Button 
                variant="link" 
                className="text-wastewise-green p-0 h-auto mt-1 font-normal"
                onClick={() => navigate('/pricing')}
              >
                Upgrade to Pro plan for benchmark analytics →
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="features">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featureMenuItems.map((feature) => (
                <Card 
                  key={feature.id}
                  className={`
                    glass-panel cursor-pointer transition-all hover:shadow-md
                    ${!canAccessFeature(feature.requiredTier) ? 'opacity-70' : ''}
                  `}
                  onClick={() => {
                    if (canAccessFeature(feature.requiredTier)) {
                      navigate(`/${feature.id}`);
                    } else {
                      handleLockedFeatureClick(feature);
                    }
                  }}
                >
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-wastewise-dark-gray flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {feature.icon}
                        {feature.name}
                      </div>
                      {!canAccessFeature(feature.requiredTier) && (
                        <Lock className="h-4 w-4 text-wastewise-gray" />
                      )}
                    </CardTitle>
                    <CardDescription className="text-wastewise-gray">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!canAccessFeature(feature.requiredTier) ? (
                      <div className="text-sm text-wastewise-gray">
                        <p>Available on {feature.requiredTier.charAt(0).toUpperCase() + feature.requiredTier.slice(1)} plan and above</p>
                        <Button 
                          className="mt-4 w-full bg-wastewise-green hover:bg-wastewise-dark-green"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('/pricing');
                          }}
                        >
                          Upgrade Plan
                        </Button>
                      </div>
                    ) : (
                      <Button variant="secondary" className="w-full justify-between">
                        Open Feature <ArrowRight className="h-4 w-4" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card className="glass-panel mt-8">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-wastewise-dark-gray">
                  Your Subscription Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="glass-panel p-4 bg-wastewise-light-gray/10">
                      <h3 className="font-medium text-wastewise-dark-gray mb-1">Current Plan</h3>
                      <p className="text-xl font-bold text-wastewise-dark-green">
                        {subscription.tier.charAt(0).toUpperCase() + subscription.tier.slice(1)}
                      </p>
                      <p className="text-sm text-wastewise-gray mt-1">{subscription.price}</p>
                    </div>
                    
                    <div className="glass-panel p-4 bg-wastewise-light-gray/10">
                      <h3 className="font-medium text-wastewise-dark-gray mb-1">Waste Entries</h3>
                      <p className="text-xl font-bold text-wastewise-dark-green">
                        {subscription.entriesUsed} / {subscription.features.maxWasteEntries === 0 ? 'Unlimited' : subscription.features.maxWasteEntries}
                      </p>
                      <p className="text-sm text-wastewise-gray mt-1">Monthly entries</p>
                    </div>
                    
                    <div className="glass-panel p-4 bg-wastewise-light-gray/10">
                      <h3 className="font-medium text-wastewise-dark-gray mb-1">Donation Alerts</h3>
                      <p className="text-xl font-bold text-wastewise-dark-green">
                        {subscription.alertsUsed} / {subscription.features.donationAlerts === 0 ? 'Unlimited' : subscription.features.donationAlerts}
                      </p>
                      <p className="text-sm text-wastewise-gray mt-1">Monthly alerts</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-wastewise-dark-gray mb-2">Features Included</h3>
                      <ul className="space-y-1">
                        <li className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-wastewise-green" />
                          <span>Waste tracking dashboard</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-wastewise-green" />
                          <span>Basic donation management</span>
                        </li>
                        {canAccessFeature('starter') && (
                          <li className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-wastewise-green" />
                            <span>Advanced analytics</span>
                          </li>
                        )}
                        {canAccessFeature('starter') && (
                          <li className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-wastewise-green" />
                            <span>POS integrations ({subscription.features.posIntegrations})</span>
                          </li>
                        )}
                        {canAccessFeature('pro') && (
                          <li className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-wastewise-green" />
                            <span>Tax compliance tools</span>
                          </li>
                        )}
                        {canAccessFeature('pro') && (
                          <li className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-wastewise-green" />
                            <span>API access</span>
                          </li>
                        )}
                        {canAccessFeature('enterprise') && (
                          <li className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-wastewise-green" />
                            <span>White-label reporting</span>
                          </li>
                        )}
                        {canAccessFeature('enterprise') && (
                          <li className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-wastewise-green" />
                            <span>Dedicated support</span>
                          </li>
                        )}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-wastewise-dark-gray mb-2">Subscription Details</h3>
                      {subscription.renewalDate ? (
                        <p className="text-sm text-wastewise-gray">
                          Next billing date: <span className="font-medium">{new Date(subscription.renewalDate).toLocaleDateString()}</span>
                        </p>
                      ) : subscription.isTrialing ? (
                        <p className="text-sm text-wastewise-gray">
                          Trial ends on: <span className="font-medium">{new Date(subscription.trialEndsAt || '').toLocaleDateString()}</span>
                        </p>
                      ) : (
                        <p className="text-sm text-wastewise-gray">Free plan with no renewal required</p>
                      )}
                      
                      {subscription.discount && (
                        <p className="text-sm text-wastewise-green mt-1">
                          <span className="font-medium">{subscription.discount}</span> discount applied
                        </p>
                      )}
                      
                      <div className="mt-4">
                        {subscription.tier !== 'enterprise' && (
                          <Button 
                            className="w-full bg-wastewise-green hover:bg-wastewise-dark-green"
                            onClick={() => navigate('/pricing')}
                          >
                            Upgrade Plan
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
