
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Calendar, FileText, MapPin, Recycle, DollarSign, UserCircle2 } from 'lucide-react';
import WasteTracker from '@/components/dashboard/WasteTracker';
import DonationManager from '@/components/dashboard/DonationManager';
import TaxReports from '@/components/dashboard/TaxReports';
import Analytics from '@/components/dashboard/Analytics';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-wastewise-cream">
      <header className="bg-white shadow-sm py-4 px-6 mb-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-wastewise-dark-green">WasteWise Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="bg-wastewise-green/10 text-wastewise-dark-green rounded-full px-4 py-1 text-sm font-medium">
              Beta
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-wastewise-gray">
                Welcome, {user?.email || 'User'}
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => navigate('/profile')}>
                <UserCircle2 size={16} />
                <span>Profile</span>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
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
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
