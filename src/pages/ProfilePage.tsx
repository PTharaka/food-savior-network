
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
  SidebarTrigger 
} from "@/components/ui/sidebar";

const ProfilePageContent = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex w-full">
      {/* Sidebar */}
      <DashboardSidebar 
        onProfileClick={() => {}}
        activeView="profile"
        setActiveView={(view) => {
          navigate(`/dashboard/${view === 'overview' ? '' : view}`);
        }}
      />
      
      {/* Main Content */}
      <SidebarInset className="flex-1">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            
            <Link to="/dashboard">
              <Button variant="ghost" className="gap-2 text-sm sm:text-base">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden xs:inline">Back to Dashboard</span>
                <span className="xs:hidden">Back</span>
              </Button>
            </Link>
            
            <div className="h-6 w-px bg-border mx-2" />
            
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-wastewise-dark-gray">
              Account Settings
            </h1>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="mx-auto grid w-full max-w-6xl gap-2">
            <UserProfile onClose={() => navigate('/dashboard')} />
          </div>
        </div>
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
