
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import {
  BarChart3,
  Package,
  FileText,
  Users,
  Settings,
  LogOut,
  Globe,
  LayoutDashboard,
  Recycle,
  BadgeDollarSign,
  ClipboardCheck,
  Sparkles,
  History,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ViewType } from '@/pages/Dashboard';
import UserProfileMenu from './UserProfileMenu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  view: ViewType;
  href: string;
  active?: boolean;
  disabled?: boolean;
  requiredTier?: string;
  onClick?: () => void;
  isCollapsed?: boolean;
};

const NavItem = ({ 
  icon, 
  label, 
  view, 
  href, 
  active, 
  disabled, 
  requiredTier, 
  onClick,
  isCollapsed = false
}: NavItemProps) => {
  const { subscription } = useSubscription();
  const tierLevels = { 'free': 0, 'starter': 1, 'pro': 2, 'enterprise': 3 };
  const isLocked = requiredTier && 
    (!subscription.tier || 
    !tierLevels[subscription.tier] || 
    tierLevels[subscription.tier] < tierLevels[requiredTier]);
  
  return (
    <Link
      to={disabled || isLocked ? "#" : href}
      onClick={(e) => {
        if (disabled || isLocked) {
          e.preventDefault();
        } else if (onClick) {
          onClick();
        }
      }}
      className={cn(
        "flex items-center gap-3 rounded-lg px-2 py-2 text-sm transition-all duration-200",
        active
          ? "bg-wastewise-light-green/20 text-wastewise-dark-green font-medium"
          : "text-wastewise-gray hover:bg-wastewise-light-green/10 hover:text-wastewise-dark-green",
        (disabled || isLocked) && "opacity-50 cursor-not-allowed",
        isCollapsed && "justify-center py-3"
      )}
      title={isCollapsed ? label : undefined}
    >
      <span className="flex-shrink-0">{icon}</span>
      {!isCollapsed && <span className="flex-1 min-w-0 break-words">{label}</span>}
      {!isCollapsed && isLocked && (
        <Badge variant="outline" className="ml-auto bg-wastewise-light-gray/20 text-wastewise-gray">
          {requiredTier}+
        </Badge>
      )}
    </Link>
  );
};

interface DashboardSidebarProps {
  className?: string;
  onProfileClick: () => void;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  isCollapsed?: boolean;
  toggleSidebar?: () => void;
}

export const DashboardSidebar = ({ 
  className, 
  onProfileClick, 
  activeView, 
  setActiveView,
  isCollapsed = false,
  toggleSidebar
}: DashboardSidebarProps) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  
  const handleNavigation = (view: ViewType, href: string) => {
    setActiveView(view);
    navigate(href);
  };

  const SectionTitle = ({ children }: { children: React.ReactNode }) => {
    if (isCollapsed) return null;
    
    return (
      <div className="text-xs uppercase text-wastewise-gray font-medium mt-6 mb-2 px-2">
        {children}
      </div>
    );
  };

  return (
    <div className={cn(
      "h-screen flex flex-col border-r border-wastewise-light-gray/20 bg-white fixed transition-all duration-300 z-20",
      isCollapsed ? "w-16" : "w-64",
      className
    )}>
      <div className="p-4 border-b border-wastewise-light-gray/20 flex items-center justify-between">
        {!isCollapsed && (
          <span className="text-wastewise-green text-xl font-bold animate-fade-in">WasteWise</span>
        )}
        {isCollapsed && (
          <span className="text-wastewise-green text-xl font-bold mx-auto animate-fade-in">W</span>
        )}
        <Button
          variant="ghost" 
          size="icon" 
          className="text-wastewise-gray hover:text-wastewise-dark-gray hover:bg-wastewise-light-green/10 animate-fade-in"
          onClick={toggleSidebar}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden py-2">
        <nav className="grid gap-1 pt-2 px-2">
          <NavItem 
            href="/dashboard" 
            view="overview"
            icon={<LayoutDashboard className="h-4 w-4" />} 
            label="Dashboard" 
            active={activeView === 'overview'} 
            onClick={() => handleNavigation('overview', '/dashboard')}
            isCollapsed={isCollapsed}
          />
          
          <SectionTitle>Waste Management</SectionTitle>
          
          <NavItem 
            href="/dashboard/waste-tracking" 
            view="waste-tracking"
            icon={<Recycle className="h-4 w-4" />} 
            label="Waste Tracking" 
            active={activeView === 'waste-tracking'} 
            onClick={() => handleNavigation('waste-tracking', '/dashboard/waste-tracking')}
            isCollapsed={isCollapsed}
          />
          <NavItem 
            href="/dashboard/donations" 
            view="donations"
            icon={<Package className="h-4 w-4" />} 
            label="Donation Management" 
            active={activeView === 'donations'} 
            onClick={() => handleNavigation('donations', '/dashboard/donations')}
            isCollapsed={isCollapsed}
          />
          <NavItem 
            href="/dashboard/tax-reports" 
            view="tax-reports"
            icon={<ClipboardCheck className="h-4 w-4" />} 
            label="Tax Compliance" 
            active={activeView === 'tax-reports'} 
            onClick={() => handleNavigation('tax-reports', '/dashboard/tax-reports')}
            isCollapsed={isCollapsed}
          />
          <NavItem 
            href="/dashboard/analytics" 
            view="analytics"
            icon={<BarChart3 className="h-4 w-4" />} 
            label="Analytics" 
            active={activeView === 'analytics'} 
            onClick={() => handleNavigation('analytics', '/dashboard/analytics')}
            isCollapsed={isCollapsed}
          />
          
          <SectionTitle>Advanced Features</SectionTitle>
          
          <NavItem 
            href="/dashboard/predictions" 
            view="predictions"
            icon={<Sparkles className="h-4 w-4" />} 
            label="AI Predictions" 
            active={activeView === 'predictions'} 
            requiredTier="pro"
            onClick={() => handleNavigation('predictions', '/dashboard/predictions')}
            isCollapsed={isCollapsed}
          />
          <NavItem 
            href="/dashboard/leaderboard" 
            view="leaderboard"
            icon={<Users className="h-4 w-4" />} 
            label="Employee Leaderboard" 
            active={activeView === 'leaderboard'} 
            requiredTier="starter"
            onClick={() => handleNavigation('leaderboard', '/dashboard/leaderboard')}
            isCollapsed={isCollapsed}
          />
          <NavItem 
            href="/dashboard/community-impact" 
            view="community-impact"
            icon={<Globe className="h-4 w-4" />} 
            label="Community Impact" 
            active={activeView === 'community-impact'} 
            onClick={() => handleNavigation('community-impact', '/dashboard/community-impact')}
            isCollapsed={isCollapsed}
          />
          <NavItem 
            href="/dashboard/history" 
            view="history"
            icon={<History className="h-4 w-4" />} 
            label="Activity History" 
            active={activeView === 'history'} 
            onClick={() => handleNavigation('history', '/dashboard/history')}
            isCollapsed={isCollapsed}
          />
        </nav>
      </div>

      <div className="mt-auto p-3 border-t border-wastewise-light-gray/20 relative">
        <div 
          className={cn(
            "flex items-center gap-2 cursor-pointer hover:bg-wastewise-light-green/10 p-2 rounded-lg transition-all duration-200",
            isCollapsed && "justify-center"
          )}
          onClick={() => setProfileMenuOpen(!profileMenuOpen)}
        >
          <Avatar className="h-10 w-10 bg-wastewise-green/20 flex-shrink-0">
            <AvatarFallback className="bg-wastewise-green/20 text-wastewise-green font-medium">
              {user?.businessName ? user.businessName.charAt(0) : user?.email?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm truncate">
                {user?.businessName || user?.email?.split('@')[0] || 'User'}
              </h3>
              <p className="text-xs text-wastewise-gray truncate">{user?.email}</p>
            </div>
          )}
          
          {!isCollapsed && (
            <Button 
              variant="ghost" 
              size="icon"
              className="ml-auto text-wastewise-gray hover:text-wastewise-dark-green transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                logout();
              }}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {profileMenuOpen && <UserProfileMenu 
          isOpen={profileMenuOpen} 
          onClose={() => setProfileMenuOpen(false)} 
        />}
      </div>
    </div>
  );
};

export default DashboardSidebar;
