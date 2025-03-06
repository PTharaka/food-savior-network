
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Calendar, FileText, MapPin, Recycle, DollarSign } from 'lucide-react';
import WasteTracker from '@/components/dashboard/WasteTracker';
import DonationManager from '@/components/dashboard/DonationManager';
import TaxReports from '@/components/dashboard/TaxReports';
import Analytics from '@/components/dashboard/Analytics';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-wastewise-cream">
      <header className="bg-white shadow-sm py-4 px-6 mb-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-wastewise-dark-gray">WasteWise Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="bg-wastewise-green/10 text-wastewise-dark-green rounded-full px-4 py-1 text-sm font-medium">
              Beta
            </div>
            <button className="btn-secondary">
              <span>User Settings</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        <Tabs defaultValue="waste" className="w-full">
          <TabsList className="mb-8 bg-wastewise-light-gray/30 p-1 rounded-lg w-full max-w-3xl mx-auto">
            <TabsTrigger value="waste" className="flex-1">Waste Tracking</TabsTrigger>
            <TabsTrigger value="donations" className="flex-1">Donations</TabsTrigger>
            <TabsTrigger value="tax" className="flex-1">Tax Reports</TabsTrigger>
            <TabsTrigger value="analytics" className="flex-1">Analytics</TabsTrigger>
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
