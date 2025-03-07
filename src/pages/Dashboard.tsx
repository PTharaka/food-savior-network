
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Calendar, FileText, MapPin, Recycle, DollarSign, UserCircle2, Menu } from 'lucide-react';
import WasteTracker from '@/components/dashboard/WasteTracker';
import DonationManager from '@/components/dashboard/DonationManager';
import TaxReports from '@/components/dashboard/TaxReports';
import Analytics from '@/components/dashboard/Analytics';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import EcoBackground from '@/components/EcoBackground';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
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
            <div className="bg-wastewise-green/10 text-wastewise-dark-green rounded-full px-4 py-1 text-sm font-medium hidden sm:block">
              Beta
            </div>
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
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
