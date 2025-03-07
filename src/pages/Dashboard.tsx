
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Calendar, FileText, MapPin, Recycle, DollarSign, UserCircle2, Menu, AlertTriangle } from 'lucide-react';
import WasteTracker from '@/components/dashboard/WasteTracker';
import DonationManager from '@/components/dashboard/DonationManager';
import TaxReports from '@/components/dashboard/TaxReports';
import Analytics from '@/components/dashboard/Analytics';
import AdvancedCharts from '@/components/dashboard/AdvancedCharts';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import EcoBackground from '@/components/EcoBackground';
import { Badge } from '@/components/ui/badge';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { subscription, getRemainingEntries, getRemainingAlerts, isReachingLimit } = useSubscription();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-wastewise-cream to-white overflow-x-hidden">
      {/* 3D Ambient Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
        <EcoBackground />
      </div>
      
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md shadow-sm py-4 px-6 mb-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <button 
              className="md:hidden mr-4 text-wastewise-dark-green"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
            <h1 className="text-2xl font-bold text-wastewise-dark-green flex items-center">
              <Recycle className="h-6 w-6 mr-2 text-wastewise-green" />
              WasteWise
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-wastewise-green/10 text-wastewise-dark-green font-medium hidden sm:flex">
              {subscription.tier.charAt(0).toUpperCase() + subscription.tier.slice(1)} Plan
            </Badge>
            <div className="flex items-center gap-3">
              <div className="text-sm text-wastewise-gray hidden md:block">
                Welcome, {user?.email || 'User'}
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => navigate('/profile')}>
                <UserCircle2 size={16} />
                <span className="hidden sm:inline">Profile</span>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <span className="hidden sm:inline">Logout</span>
                <span className="sm:hidden">Exit</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-12 pt-6">
        {/* Subscription Info */}
        <div className="glass-panel p-5 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-lg font-semibold text-wastewise-dark-gray flex items-center gap-2">
                Subscription Status
                {subscription.isTrialing && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">Trial</Badge>
                )}
              </h2>
              <p className="text-wastewise-gray">
                {subscription.tier === 'free' ? 'Free Plan' : `${subscription.price}${subscription.discount ? ` (${subscription.discount})` : ''}`}
                {subscription.isTrialing && subscription.trialEndsAt && ` • Trial ends on ${subscription.trialEndsAt}`}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              {isReachingLimit('entries') && (
                <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2 rounded-md flex items-center gap-2 text-sm">
                  <AlertTriangle size={16} />
                  <span>Nearing waste entries limit</span>
                </div>
              )}
              
              {subscription.tier !== 'enterprise' && (
                <Button 
                  className="bg-wastewise-green text-white hover:bg-wastewise-dark-green w-full sm:w-auto"
                  onClick={() => navigate('/pricing')}
                >
                  Upgrade Plan
                </Button>
              )}
            </div>
          </div>
          
          {subscription.tier === 'free' || subscription.tier === 'starter' ? (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-wastewise-dark-gray">Waste Entries</span>
                  <span className="text-wastewise-gray">
                    {subscription.entriesUsed} / {subscription.features.maxWasteEntries === 0 ? '∞' : subscription.features.maxWasteEntries}
                  </span>
                </div>
                <Progress 
                  value={subscription.features.maxWasteEntries === 0 ? 0 : (subscription.entriesUsed / subscription.features.maxWasteEntries) * 100} 
                  className="h-2 bg-wastewise-light-gray/30"
                  indicatorClassName={isReachingLimit('entries') ? 'bg-amber-500' : 'bg-wastewise-green'}
                />
              </div>
              
              {!subscription.features.unlimitedAlerts && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-wastewise-dark-gray">Donation Alerts</span>
                    <span className="text-wastewise-gray">
                      {subscription.alertsUsed} / {subscription.features.donationAlerts === 0 ? '∞' : subscription.features.donationAlerts}
                    </span>
                  </div>
                  <Progress 
                    value={subscription.features.donationAlerts === 0 ? 0 : (subscription.alertsUsed / subscription.features.donationAlerts) * 100} 
                    className="h-2 bg-wastewise-light-gray/30"
                    indicatorClassName={isReachingLimit('alerts') ? 'bg-amber-500' : 'bg-wastewise-green'}
                  />
                </div>
              )}
            </div>
          ) : null}
        </div>

        <Tabs defaultValue="waste" className="w-full">
          <TabsList className="mb-8 bg-wastewise-light-gray/30 p-1 rounded-lg w-full max-w-3xl mx-auto">
            <TabsTrigger value="waste" className="flex items-center gap-1.5 flex-1">
              <Recycle size={16} />
              <span>Waste Tracking</span>
            </TabsTrigger>
            <TabsTrigger value="donations" className="flex items-center gap-1.5 flex-1">
              <MapPin size={16} />
              <span>Donations</span>
            </TabsTrigger>
            <TabsTrigger value="tax" className="flex items-center gap-1.5 flex-1">
              <FileText size={16} />
              <span>Tax Reports</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-1.5 flex-1">
              <BarChart3 size={16} />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-sm p-6 mb-6">
            <TabsContent value="waste">
              <WasteTracker />
            </TabsContent>
            <TabsContent value="donations">
              <DonationManager />
            </TabsContent>
            <TabsContent value="tax">
              <TaxReports />
            </TabsContent>
            <TabsContent value="analytics">
              <Analytics />
              <div className="mt-8">
                <AdvancedCharts />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
