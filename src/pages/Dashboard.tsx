
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatCards from '@/components/dashboard/StatCards';
import SocialOverviewChart from '@/components/dashboard/SocialOverviewChart';
import EngagementMetrics from '@/components/dashboard/EngagementMetrics';
import TopGeographies from '@/components/dashboard/TopGeographies';
import PostPlanner from '@/components/dashboard/PostPlanner';
import CommentsSection from '@/components/dashboard/CommentsSection';
import WasteTrackingMetrics from '@/components/dashboard/WasteTrackingMetrics';
import DonationAlerts from '@/components/dashboard/DonationAlerts';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  if (!user) {
    navigate('/login');
    return null;
  }

  const userName = user.businessName || user.email?.split('@')[0] || 'User';

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />
      
      <div className="flex-1 ml-64">
        <DashboardHeader userName={userName} />
        
        <main className="p-6">
          <StatCards />
          <SocialOverviewChart />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <WasteTrackingMetrics />
            <TopGeographies />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DonationAlerts />
            <EngagementMetrics />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
