
import React, { useState } from 'react';
import UserProfile from '@/components/UserProfile';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

// This component is not being used but we'll fix it anyway
const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('profile');
  
  return (
    <div className="h-screen flex overflow-hidden bg-wastewise-cream/50">
      <div className="fixed md:relative h-full w-64 z-40 md:z-0 bg-white">
        <DashboardSidebar 
          onProfileClick={() => {}}
          activeView="profile"
          setActiveView={(view) => {
            navigate(`/dashboard/${view === 'overview' ? '' : view}`);
          }}
        />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <header className="bg-white shadow-sm py-4 px-6 mb-6">
          <div className="max-w-7xl mx-auto flex items-center">
            <Link to="/dashboard">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-wastewise-dark-gray ml-4">Account Settings</h1>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <UserProfile onClose={() => navigate('/dashboard')} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
