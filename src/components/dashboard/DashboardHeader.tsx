
import React from 'react';
import { Bell, Search, UserRound } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DashboardHeaderProps {
  userName: string;
  showProfileButton?: boolean;
  onProfileClick?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  userName, 
  showProfileButton = true,
  onProfileClick 
}) => {
  return (
    <header className="bg-white border-b p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-wastewise-dark-gray">Welcome, {userName}</h1>
          <p className="text-wastewise-gray text-sm">Here's your waste management overview</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative hidden md:block w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-wastewise-gray" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-9 bg-wastewise-light-gray/10 border-wastewise-light-gray/20"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-wastewise-gray" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-wastewise-green rounded-full flex items-center justify-center text-[10px] text-white font-bold">
              3
            </span>
          </Button>
          
          {showProfileButton && (
            <Button 
              variant="ghost" 
              className="flex items-center space-x-2"
              onClick={onProfileClick}
            >
              <UserRound className="h-5 w-5 text-wastewise-gray" />
              <span className="hidden md:inline">Profile</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
