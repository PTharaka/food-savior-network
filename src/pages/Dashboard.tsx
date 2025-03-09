import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatCards from '@/components/dashboard/StatCards';
import SocialOverviewChart from '@/components/dashboard/SocialOverviewChart';
import EngagementMetrics from '@/components/dashboard/EngagementMetrics';
import TopGeographies from '@/components/dashboard/TopGeographies';
import WasteTrackingMetrics from '@/components/dashboard/WasteTrackingMetrics';
import DonationAlerts from '@/components/dashboard/DonationAlerts';
import UserProfile from '@/components/UserProfile';
import WasteTracker from '@/components/dashboard/WasteTracker';
import DonationManager from '@/components/dashboard/DonationManager';
import TaxReports from '@/components/dashboard/TaxReports';
import Analytics from '@/components/dashboard/Analytics';

// Define all possible view types to ensure type safety
export type ViewType = 'overview' | 'waste-tracking' | 'donations' | 'tax-reports' | 
  'analytics' | 'predictions' | 'leaderboard' | 'community-impact' | 
  'history' | 'settings' | 'subscription' | 'profile';

interface DashboardProps {
  initialView?: ViewType;
}

const Dashboard: React.FC<DashboardProps> = ({ initialView = 'overview' }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<ViewType>(initialView);
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  useEffect(() => {
    if (initialView === 'profile') {
      setShowProfile(true);
    } else {
      setActiveView(initialView);
      setShowProfile(false);
    }
  }, [initialView]);
  
  if (!user) {
    navigate('/login');
    return null;
  }

  const userName = user.businessName || user.email?.split('@')[0] || 'User';

  const renderContent = () => {
    if (showProfile) {
      return <UserProfile onClose={() => {
        setShowProfile(false);
        navigate('/dashboard');
      }} />;
    }

    switch (activeView) {
      case 'waste-tracking':
        return <WasteTracker />;
      case 'donations':
        return <DonationManager />;
      case 'tax-reports':
        return <TaxReports />;
      case 'analytics':
        return <Analytics />;
      case 'predictions':
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">AI Predictions</h2>
            <p className="text-wastewise-gray mb-6">AI-powered waste prediction features are available on the Pro plan.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-wastewise-light-beige rounded-lg border border-wastewise-light-gray/20">
                <h3 className="text-lg font-semibold mb-2">Food Waste Forecasting</h3>
                <p className="text-wastewise-gray mb-4">Predict food waste levels based on historical data, seasonal trends, and business patterns.</p>
                <ul className="list-disc pl-5 text-sm text-wastewise-dark-gray space-y-1">
                  <li>7-day advance predictions</li>
                  <li>Item-level waste forecasting</li>
                  <li>Seasonal trend analysis</li>
                </ul>
              </div>
              
              <div className="p-6 bg-wastewise-light-beige rounded-lg border border-wastewise-light-gray/20">
                <h3 className="text-lg font-semibold mb-2">Inventory Optimization</h3>
                <p className="text-wastewise-gray mb-4">AI-powered suggestions for optimal ordering quantities to minimize waste.</p>
                <ul className="list-disc pl-5 text-sm text-wastewise-dark-gray space-y-1">
                  <li>Smart ordering recommendations</li>
                  <li>Stock rotation alerts</li>
                  <li>Expiration date tracking</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 'leaderboard':
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Employee Leaderboard</h2>
            <p className="text-wastewise-gray mb-6">Employee engagement leaderboard is available on the Starter plan.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-wastewise-light-beige rounded-lg border border-wastewise-light-gray/20">
                <h3 className="text-lg font-semibold mb-2">Individual Performance</h3>
                <p className="text-wastewise-gray mb-4">Track waste reduction metrics for individual employees to encourage positive competition.</p>
                <ul className="list-disc pl-5 text-sm text-wastewise-dark-gray space-y-1">
                  <li>Employee waste reduction scores</li>
                  <li>Weekly/monthly rankings</li>
                  <li>Achievement badges</li>
                </ul>
              </div>
              
              <div className="p-6 bg-wastewise-light-beige rounded-lg border border-wastewise-light-gray/20">
                <h3 className="text-lg font-semibold mb-2">Team Challenges</h3>
                <p className="text-wastewise-gray mb-4">Create team-based challenges to boost collective waste reduction efforts.</p>
                <ul className="list-disc pl-5 text-sm text-wastewise-dark-gray space-y-1">
                  <li>Department competitions</li>
                  <li>Customizable goals</li>
                  <li>Reward system integration</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 'community-impact':
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Community Impact</h2>
            <p className="text-wastewise-gray mb-6">View your organization's community impact and sustainability metrics.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="p-6 bg-wastewise-light-beige rounded-lg border border-wastewise-light-gray/20 text-center">
                <h3 className="text-4xl font-bold text-wastewise-dark-green">1,450</h3>
                <p className="text-wastewise-gray mt-2">Meals Provided</p>
              </div>
              
              <div className="p-6 bg-wastewise-light-beige rounded-lg border border-wastewise-light-gray/20 text-center">
                <h3 className="text-4xl font-bold text-wastewise-dark-green">1.2</h3>
                <p className="text-wastewise-gray mt-2">Tons CO₂ Avoided</p>
              </div>
              
              <div className="p-6 bg-wastewise-light-beige rounded-lg border border-wastewise-light-gray/20 text-center">
                <h3 className="text-4xl font-bold text-wastewise-dark-green">14</h3>
                <p className="text-wastewise-gray mt-2">Local Organizations Supported</p>
              </div>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Community Partners</h3>
              <p className="text-wastewise-gray mb-4">Your business has partnered with these local organizations:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-wastewise-light-gray/20 rounded-lg">
                  <h4 className="font-medium">City Food Bank</h4>
                  <p className="text-sm text-wastewise-gray">450 meals provided</p>
                </div>
                <div className="p-4 border border-wastewise-light-gray/20 rounded-lg">
                  <h4 className="font-medium">Community Kitchen</h4>
                  <p className="text-sm text-wastewise-gray">380 meals provided</p>
                </div>
                <div className="p-4 border border-wastewise-light-gray/20 rounded-lg">
                  <h4 className="font-medium">Local Shelter</h4>
                  <p className="text-sm text-wastewise-gray">320 meals provided</p>
                </div>
                <div className="p-4 border border-wastewise-light-gray/20 rounded-lg">
                  <h4 className="font-medium">Senior Center</h4>
                  <p className="text-sm text-wastewise-gray">300 meals provided</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'history':
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Activity History</h2>
            <p className="text-wastewise-gray mb-6">View your waste reduction and donation history.</p>
            
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-wastewise-light-beige">
                  <tr>
                    <th className="text-left p-4 font-medium text-wastewise-dark-gray">Date</th>
                    <th className="text-left p-4 font-medium text-wastewise-dark-gray">Activity</th>
                    <th className="text-left p-4 font-medium text-wastewise-dark-gray">Amount</th>
                    <th className="text-left p-4 font-medium text-wastewise-dark-gray">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-wastewise-light-gray/20">
                    <td className="p-4 text-wastewise-dark-gray">Nov 18, 2023</td>
                    <td className="p-4 text-wastewise-dark-gray">Donation to City Food Bank</td>
                    <td className="p-4 text-wastewise-dark-gray">12.4 kg</td>
                    <td className="p-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span></td>
                  </tr>
                  <tr className="border-t border-wastewise-light-gray/20 bg-wastewise-light-beige/30">
                    <td className="p-4 text-wastewise-dark-gray">Nov 15, 2023</td>
                    <td className="p-4 text-wastewise-dark-gray">Waste Tracking Update</td>
                    <td className="p-4 text-wastewise-dark-gray">8.7 kg</td>
                    <td className="p-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span></td>
                  </tr>
                  <tr className="border-t border-wastewise-light-gray/20">
                    <td className="p-4 text-wastewise-dark-gray">Nov 12, 2023</td>
                    <td className="p-4 text-wastewise-dark-gray">Donation to Community Kitchen</td>
                    <td className="p-4 text-wastewise-dark-gray">15.2 kg</td>
                    <td className="p-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span></td>
                  </tr>
                  <tr className="border-t border-wastewise-light-gray/20 bg-wastewise-light-beige/30">
                    <td className="p-4 text-wastewise-dark-gray">Nov 10, 2023</td>
                    <td className="p-4 text-wastewise-dark-gray">Tax Report Generated</td>
                    <td className="p-4 text-wastewise-dark-gray">-</td>
                    <td className="p-4"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Downloaded</span></td>
                  </tr>
                  <tr className="border-t border-wastewise-light-gray/20">
                    <td className="p-4 text-wastewise-dark-gray">Nov 7, 2023</td>
                    <td className="p-4 text-wastewise-dark-gray">Waste Tracking Update</td>
                    <td className="p-4 text-wastewise-dark-gray">10.1 kg</td>
                    <td className="p-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p className="text-wastewise-gray mb-6">Manage your account settings and preferences.</p>
            
            <div className="bg-wastewise-light-beige p-6 rounded-lg border border-wastewise-light-gray/20 mb-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Account Information</h3>
                  <p className="text-wastewise-gray mt-1">Update your business name, email, and contact information.</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg border border-wastewise-light-gray/20 text-center">
                  <p className="text-wastewise-gray text-sm">Last Updated</p>
                  <p className="text-wastewise-dark-green font-bold text-xl">Nov 10, 2023</p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-wastewise-light-gray/20 mb-4">
                <h4 className="font-medium mb-2">Notification Preferences</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <li className="flex items-center text-sm text-wastewise-dark-gray">
                    <span className="bg-wastewise-green/20 text-wastewise-green p-1 rounded-full mr-2">✓</span>
                    Email notifications
                  </li>
                  <li className="flex items-center text-sm text-wastewise-dark-gray">
                    <span className="bg-wastewise-green/20 text-wastewise-green p-1 rounded-full mr-2">✓</span>
                    SMS notifications
                  </li>
                  <li className="flex items-center text-sm text-wastewise-dark-gray">
                    <span className="bg-wastewise-green/20 text-wastewise-green p-1 rounded-full mr-2">✓</span>
                    Push notifications
                  </li>
                </ul>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-sm text-wastewise-dark-gray">Usage: 23/50 entries</span>
                  <div className="w-32 h-2 bg-gray-200 rounded-full mx-2">
                    <div className="h-2 bg-wastewise-green rounded-full" style={{width: '46%'}}></div>
                  </div>
                </div>
                <button className="bg-wastewise-green text-white px-4 py-2 rounded-lg hover:bg-wastewise-dark-green transition-colors">
                  Update Settings
                </button>
              </div>
            </div>
          </div>
        );
      case 'subscription':
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Subscription Management</h2>
            <p className="text-wastewise-gray mb-6">Manage your WasteWise subscription and billing details.</p>
            
            <div className="bg-wastewise-light-beige p-6 rounded-lg border border-wastewise-light-gray/20 mb-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Current Plan</h3>
                  <p className="text-wastewise-green font-bold text-2xl mt-1">Free Plan</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg border border-wastewise-light-gray/20 text-center">
                  <p className="text-wastewise-gray text-sm">Monthly Price</p>
                  <p className="text-wastewise-dark-green font-bold text-xl">$0</p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-wastewise-light-gray/20 mb-4">
                <h4 className="font-medium mb-2">Plan Features</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <li className="flex items-center text-sm text-wastewise-dark-gray">
                    <span className="bg-wastewise-green/20 text-wastewise-green p-1 rounded-full mr-2">✓</span>
                    50 waste entries per month
                  </li>
                  <li className="flex items-center text-sm text-wastewise-dark-gray">
                    <span className="bg-wastewise-green/20 text-wastewise-green p-1 rounded-full mr-2">✓</span>
                    Basic analytics
                  </li>
                  <li className="flex items-center text-sm text-wastewise-dark-gray">
                    <span className="bg-wastewise-green/20 text-wastewise-green p-1 rounded-full mr-2">✓</span>
                    3 donation alerts
                  </li>
                  <li className="flex items-center text-sm text-wastewise-dark-gray">
                    <span className="bg-wastewise-green/20 text-wastewise-green p-1 rounded-full mr-2">✓</span>
                    Email support
                  </li>
                </ul>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-sm text-wastewise-dark-gray">Usage: 23/50 entries</span>
                  <div className="w-32 h-2 bg-gray-200 rounded-full mx-2">
                    <div className="h-2 bg-wastewise-green rounded-full" style={{width: '46%'}}></div>
                  </div>
                </div>
                <button className="bg-wastewise-green text-white px-4 py-2 rounded-lg hover:bg-wastewise-dark-green transition-colors">
                  Upgrade Plan
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 border border-wastewise-light-gray/20 rounded-lg flex flex-col">
                <h3 className="text-lg font-semibold mb-1">Starter</h3>
                <p className="text-wastewise-dark-green font-bold text-2xl mb-4">$49<span className="text-sm text-wastewise-gray font-normal">/month</span></p>
                <ul className="text-sm space-y-2 flex-grow mb-4">
                  <li className="flex items-start">
                    <span className="text-wastewise-green mr-2">✓</span>
                    500 waste entries per month
                  </li>
                  <li className="flex items-start">
                    <span className="text-wastewise-green mr-2">✓</span>
                    Advanced analytics
                  </li>
                  <li className="flex items-start">
                    <span className="text-wastewise-green mr-2">✓</span>
                    10 donation alerts
                  </li>
                  <li className="flex items-start">
                    <span className="text-wastewise-green mr-2">✓</span>
                    3 POS integrations
                  </li>
                </ul>
                <button className="bg-white border border-wastewise-green text-wastewise-green px-4 py-2 rounded-lg hover:bg-wastewise-green hover:text-white transition-colors w-full">
                  Select Plan
                </button>
              </div>
              
              <div className="p-5 border-2 border-wastewise-green rounded-lg flex flex-col relative">
                <div className="absolute top-0 right-0 transform translate-y-[-50%] bg-wastewise-green text-white text-xs px-3 py-1 rounded-full">
                  Popular
                </div>
                <h3 className="text-lg font-semibold mb-1">Pro</h3>
                <p className="text-wastewise-dark-green font-bold text-2xl mb-4">$199<span className="text-sm text-wastewise-gray font-normal">/month</span></p>
                <ul className="text-sm space-y-2 flex-grow mb-4">
                  <li className="flex items-start">
                    <span className="text-wastewise-green mr-2">✓</span>
                    5,000 waste entries per month
                  </li>
                  <li className="flex items-start">
                    <span className="text-wastewise-green mr-2">✓</span>
                    Unlimited donation alerts
                  </li>
                  <li className="flex items-start">
                    <span className="text-wastewise-green mr-2">✓</span>
                    AI predictions
                  </li>
                  <li className="flex items-start">
                    <span className="text-wastewise-green mr-2">✓</span>
                    Tax compliance tools
                  </li>
                  <li className="flex items-start">
                    <span className="text-wastewise-green mr-2">✓</span>
                    API access
                  </li>
                </ul>
                <button className="bg-wastewise-green text-white px-4 py-2 rounded-lg hover:bg-wastewise-dark-green transition-colors w-full">
                  Select Plan
                </button>
              </div>
              
              <div className="p-5 border border-wastewise-light-gray/20 rounded-lg flex flex-col">
                <h3 className="text-lg font-semibold mb-1">Enterprise</h3>
                <p className="text-wastewise-dark-green font-bold text-2xl mb-4">Custom<span className="text-sm text-wastewise-gray font-normal"> pricing</span></p>
                <ul className="text-sm space-y-2 flex-grow mb-4">
                  <li className="flex items-start">
                    <span className="text-wastewise-green mr-2">✓</span>
                    Unlimited waste entries
                  </li>
                  <li className="flex items-start">
                    <span className="text-wastewise-green mr-2">✓</span>
                    White-label option
                  </li>
                  <li className="flex items-start">
                    <span className="text-wastewise-green mr-2">✓</span>
                    Custom integrations
                  </li>
                  <li className="flex items-start">
                    <span className="text-wastewise-green mr-2">✓</span>
                    Dedicated account manager
                  </li>
                </ul>
                <button className="bg-white border border-wastewise-light-gray/80 text-wastewise-dark-gray px-4 py-2 rounded-lg hover:bg-wastewise-light-beige transition-colors w-full">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <>
            <StatCards />
            <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <SocialOverviewChart />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <WasteTrackingMetrics />
              <TopGeographies />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DonationAlerts />
              <EngagementMetrics />
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar 
        onProfileClick={() => {
          setShowProfile(true);
          setActiveView('profile');
        }}
        activeView={activeView}
        setActiveView={(view: ViewType) => {
          setActiveView(view);
          setShowProfile(false);
        }}
        isCollapsed={sidebarCollapsed}
        toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className={`flex-1 ${sidebarCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        <DashboardHeader userName={userName} />
        
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
