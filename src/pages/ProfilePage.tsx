
import React, { useState } from 'react';
import UserProfile from '@/components/UserProfile';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { useIsMobile } from '@/hooks/use-mobile';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('profile');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved ? JSON.parse(saved) : false;
  });
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => {
    setSidebarCollapsed(prev => {
      const newValue = !prev;
      localStorage.setItem('sidebar-collapsed', JSON.stringify(newValue));
      return newValue;
    });
  };
  
  return (
    <div className="min-h-screen flex overflow-hidden bg-wastewise-cream/50">
      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}
      
      {/* Sidebar */}
      <DashboardSidebar 
        className={isMobile && !sidebarOpen ? '-translate-x-full' : ''}
        onProfileClick={() => {}}
        activeView="profile"
        setActiveView={(view) => {
          navigate(`/dashboard/${view === 'overview' ? '' : view}`);
          if (isMobile) setSidebarOpen(false);
        }}
        isCollapsed={sidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />
      
      {/* Main Content */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Header */}
        <header className="bg-white shadow-sm py-3 px-4 sm:py-4 sm:px-6 border-b">
          <div className="flex items-center gap-3">
            {isMobile && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="p-2"
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            
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
      </div>
    </div>
  );
};

export default ProfilePage;
