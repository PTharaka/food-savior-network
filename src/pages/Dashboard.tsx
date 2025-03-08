
import React, { useState } from 'react';
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

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfile, setShowProfile] = useState(location.pathname === '/dashboard/settings');
  
  if (!user) {
    navigate('/login');
    return null;
  }

  const userName = user.businessName || user.email?.split('@')[0] || 'User';

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar onProfileClick={() => setShowProfile(true)} />
      
      <div className="flex-1 ml-64">
        <DashboardHeader 
          userName={userName} 
          showProfileButton={!showProfile}
          onProfileClick={() => setShowProfile(true)}
        />
        
        <main className="p-6">
          {showProfile ? (
            <div className="mb-6">
              <UserProfile onClose={() => setShowProfile(false)} />
            </div>
          ) : (
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
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
