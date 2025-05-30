
import React from 'react';
import UserProfile from '@/components/UserProfile';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  SidebarProvider, 
  SidebarInset, 
  SidebarTrigger,
  useSidebar 
} from "@/components/ui/sidebar";

const ProfilePageContent = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex w-full bg-wastewise-cream/50">
      {/* Sidebar */}
      <DashboardSidebar 
        onProfileClick={() => {}}
        activeView="profile"
        setActiveView={(view) => {
          navigate(`/dashboard/${view === 'overview' ? '' : view}`);
        }}
      />
      
      {/* Main Content */}
      <SidebarInset>
        {/* Header */}
        <header className="bg-white shadow-sm py-3 px-4 sm:py-4 sm:px-6 border-b">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            
            <Link to="/dashboard">
              <Button variant="ghost" className="gap-2 text-sm sm:text-base">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden xs:inline">Back to Dashboard</span>
                <span className="xs:hidden">Back</span>
              </Button>
            </Link>
            
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-wastewise-dark-gray">
              Account Settings
            </h1>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
          <div className="max-w-4xl mx-auto">
            <UserProfile onClose={() => navigate('/dashboard')} />
          </div>
        </main>
      </SidebarInset>
    </div>
  );
};

const ProfilePage = () => {
  return (
    <SidebarProvider>
      <ProfilePageContent />
    </SidebarProvider>
  );
};

export default ProfilePage;
