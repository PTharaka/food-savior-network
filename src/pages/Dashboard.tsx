
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
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
type ViewType = 'overview' | 'waste-tracking' | 'donations' | 'tax-reports' | 
  'analytics' | 'predictions' | 'leaderboard' | 'community-impact' | 
  'history' | 'subscription' | 'profile';

interface DashboardProps {
  initialView?: ViewType;
}

const Dashboard: React.FC<DashboardProps> = ({ initialView = 'overview' }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeView, setActiveView] = useState<ViewType>(initialView);
  const [showProfile, setShowProfile] = useState(false);
  
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
            <p className="text-wastewise-gray">AI-powered waste prediction features are available on the Pro plan.</p>
          </div>
        );
      case 'leaderboard':
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Employee Leaderboard</h2>
            <p className="text-wastewise-gray">Employee engagement leaderboard is available on the Starter plan.</p>
          </div>
        );
      case 'community-impact':
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Community Impact</h2>
            <p className="text-wastewise-gray">View your organization's community impact and sustainability metrics.</p>
          </div>
        );
      case 'history':
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Activity History</h2>
            <p className="text-wastewise-gray">View your waste reduction and donation history.</p>
          </div>
        );
      case 'subscription':
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Subscription Management</h2>
            <p className="text-wastewise-gray">Manage your WasteWise subscription and billing details.</p>
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
          setActiveView('profile' as ViewType);
        }}
        activeView={activeView}
        setActiveView={(view: ViewType) => {
          setActiveView(view);
          setShowProfile(false);
        }}
      />
      
      <div className="flex-1 ml-64">
        <DashboardHeader 
          userName={userName} 
          showProfileButton={!showProfile}
          onProfileClick={() => {
            setShowProfile(true);
            setActiveView('profile' as ViewType);
          }}
        />
        
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
