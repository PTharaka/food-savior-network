
import React from 'react';
import { User, Settings, LogOut, HelpCircle, CreditCard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface UserProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfileMenu: React.FC<UserProfileMenuProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  if (!isOpen) return null;
  
  const handleLogout = () => {
    logout();
    onClose();
  };
  
  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };
  
  return (
    <>
      {/* Backdrop to prevent clicking through and to separate from background */}
      <div 
        className="fixed inset-0 bg-black/5 z-[90]" 
        onClick={onClose}
      />
      
      <Card className="absolute bottom-16 left-4 w-64 shadow-xl z-[100] p-0 overflow-hidden border-2 border-wastewise-light-green/20 bg-white animate-fade-in">
        <div className="p-4 border-b flex items-center space-x-3 bg-wastewise-light-beige">
          <div className="bg-wastewise-green/20 h-10 w-10 rounded-full flex items-center justify-center text-lg font-bold text-wastewise-green">
            {user?.businessName ? user.businessName.charAt(0) : user?.email?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm truncate">
              {user?.businessName || user?.email?.split('@')[0] || 'User'}
            </h3>
            <p className="text-xs text-wastewise-gray truncate">{user?.email}</p>
          </div>
        </div>
        
        <div className="py-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start px-4 py-2 h-auto hover:bg-wastewise-light-green/10"
            onClick={() => handleNavigation('/dashboard/profile')}
          >
            <User className="h-4 w-4 mr-3" />
            <span className="text-sm">View Profile</span>
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start px-4 py-2 h-auto hover:bg-wastewise-light-green/10"
            onClick={() => handleNavigation('/dashboard/settings')}
          >
            <Settings className="h-4 w-4 mr-3" />
            <span className="text-sm">Settings</span>
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start px-4 py-2 h-auto hover:bg-wastewise-light-green/10"
            onClick={() => handleNavigation('/dashboard/subscription')}
          >
            <CreditCard className="h-4 w-4 mr-3" />
            <span className="text-sm">Subscription</span>
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start px-4 py-2 h-auto hover:bg-wastewise-light-green/10"
          >
            <HelpCircle className="h-4 w-4 mr-3" />
            <span className="text-sm">Help & Support</span>
          </Button>
        </div>
        
        <div className="p-2 border-t">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-3" />
            <span className="text-sm">Logout</span>
          </Button>
        </div>
      </Card>
    </>
  );
};

export default UserProfileMenu;
