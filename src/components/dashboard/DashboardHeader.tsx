
import React, { useState } from 'react';
import { Bell, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NotificationPanel from './NotificationPanel';

interface DashboardHeaderProps {
  userName: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName }) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="bg-white border-b p-4 relative z-10 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="animate-fade-in">
          <h1 className="text-xl font-bold text-wastewise-dark-gray">Welcome, {userName}</h1>
          <p className="text-wastewise-gray text-sm">Here's your waste management overview</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative hidden md:block w-64 animate-fade-in">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-wastewise-gray" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-9 bg-wastewise-light-gray/10 border-wastewise-light-gray/20 hover:border-wastewise-green/50 transition-colors"
            />
          </div>
          
          <div className="relative animate-fade-in">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-wastewise-light-green/10 transition-all hover:scale-105"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <Bell className="h-5 w-5 text-wastewise-gray" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-wastewise-green rounded-full flex items-center justify-center text-[10px] text-white font-bold animate-pulse">
                3
              </span>
            </Button>
            
            {notificationsOpen && (
              <div 
                className="fixed inset-0 bg-black/20 z-30"
                onClick={() => setNotificationsOpen(false)}
              ></div>
            )}
            
            <NotificationPanel 
              isOpen={notificationsOpen} 
              onClose={() => setNotificationsOpen(false)}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
