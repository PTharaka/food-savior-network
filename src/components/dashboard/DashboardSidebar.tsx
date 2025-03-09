import React from 'react';
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
  History
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

type ViewType = 'overview' | 'waste-tracking' | 'donations' | 'tax-reports' | 
  'analytics' | 'predictions' | 'leaderboard' | 'community-impact' | 
  'history' | 'subscription' | 'profile';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  view: ViewType;
  href: string;
  active?: boolean;
  disabled?: boolean;
  requiredTier?: string;
  onClick?: () => void;
}

const NavItem = ({ 
  icon, 
  label, 
  view, 
  href, 
  active, 
  disabled, 
  requiredTier, 
  onClick 
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
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
        active
          ? "bg-wastewise-light-green/20 text-wastewise-dark-green font-medium"
          : "text-wastewise-gray hover:bg-wastewise-light-green/10 hover:text-wastewise-dark-green",
        (disabled || isLocked) && "opacity-50 cursor-not-allowed"
      )}
    >
      {icon}
      <span>{label}</span>
      {isLocked && (
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
}

export const DashboardSidebar = ({ 
  className, 
  onProfileClick, 
  activeView, 
  setActiveView 
}: DashboardSidebarProps) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const handleNavigation = (view: ViewType, href: string) => {
    setActiveView(view);
    navigate(href);
  };

  return (
    <div className={cn("h-screen flex flex-col border-r border-wastewise-light-gray/20 bg-white fixed w-64", className)}>
      <div className="p-4 border-b border-wastewise-light-gray/20">
        <div className="flex items-center gap-2">
          <span className="text-wastewise-green text-xl font-bold">WasteWise</span>
          <button className="ml-auto text-wastewise-gray">
            <span className="sr-only">Toggle sidebar</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto py-2 px-4">
        <nav className="grid gap-1 pt-2">
          <NavItem 
            href="/dashboard" 
            view="overview"
            icon={<LayoutDashboard className="h-4 w-4" />} 
            label="Dashboard" 
            active={activeView === 'overview'} 
            onClick={() => handleNavigation('overview', '/dashboard')}
          />
          
          <div className="text-xs uppercase text-wastewise-gray font-medium mt-6 mb-2 px-3">
            Waste Management
          </div>
          
          <NavItem 
            href="/dashboard/waste-tracking" 
            view="waste-tracking"
            icon={<Recycle className="h-4 w-4" />} 
            label="Waste Tracking" 
            active={activeView === 'waste-tracking'} 
            onClick={() => handleNavigation('waste-tracking', '/dashboard/waste-tracking')}
          />
          <NavItem 
            href="/dashboard/donations" 
            view="donations"
            icon={<Package className="h-4 w-4" />} 
            label="Donation Management" 
            active={activeView === 'donations'} 
            onClick={() => handleNavigation('donations', '/dashboard/donations')}
          />
          <NavItem 
            href="/dashboard/tax-reports" 
            view="tax-reports"
            icon={<ClipboardCheck className="h-4 w-4" />} 
            label="Tax Compliance" 
            active={activeView === 'tax-reports'} 
            onClick={() => handleNavigation('tax-reports', '/dashboard/tax-reports')}
          />
          <NavItem 
            href="/dashboard/analytics" 
            view="analytics"
            icon={<BarChart3 className="h-4 w-4" />} 
            label="Analytics" 
            active={activeView === 'analytics'} 
            onClick={() => handleNavigation('analytics', '/dashboard/analytics')}
          />
          
          <div className="text-xs uppercase text-wastewise-gray font-medium mt-6 mb-2 px-3">
            Advanced Features
          </div>
          
          <NavItem 
            href="/dashboard/predictions" 
            view="predictions"
            icon={<Sparkles className="h-4 w-4" />} 
            label="AI Predictions" 
            active={activeView === 'predictions'} 
            requiredTier="pro"
            onClick={() => handleNavigation('predictions', '/dashboard/predictions')}
          />
          <NavItem 
            href="/dashboard/leaderboard" 
            view="leaderboard"
            icon={<Users className="h-4 w-4" />} 
            label="Employee Leaderboard" 
            active={activeView === 'leaderboard'} 
            requiredTier="starter"
            onClick={() => handleNavigation('leaderboard', '/dashboard/leaderboard')}
          />
          <NavItem 
            href="/dashboard/community-impact" 
            view="community-impact"
            icon={<Globe className="h-4 w-4" />} 
            label="Community Impact" 
            active={activeView === 'community-impact'} 
            onClick={() => handleNavigation('community-impact', '/dashboard/community-impact')}
          />
          <NavItem 
            href="/dashboard/history" 
            view="history"
            icon={<History className="h-4 w-4" />} 
            label="Activity History" 
            active={activeView === 'history'} 
            onClick={() => handleNavigation('history', '/dashboard/history')}
          />
          
          <div className="text-xs uppercase text-wastewise-gray font-medium mt-6 mb-2 px-3">
            Account
          </div>
          
          <NavItem 
            href="#" 
            view="profile"
            icon={<Settings className="h-4 w-4" />} 
            label="Settings" 
            active={activeView === 'profile'}
            onClick={onProfileClick}
          />
          <NavItem 
            href="/dashboard/subscription" 
            view="subscription"
            icon={<BadgeDollarSign className="h-4 w-4" />} 
            label="Subscription" 
            active={activeView === 'subscription'} 
            onClick={() => handleNavigation('subscription', '/dashboard/subscription')}
          />
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-wastewise-light-gray/20 flex items-center">
        <div 
          className="bg-wastewise-green/20 h-10 w-10 rounded-full flex items-center justify-center text-lg font-bold text-wastewise-green cursor-pointer" 
          onClick={onProfileClick}
        >
          {user?.businessName ? user.businessName.charAt(0) : user?.email?.charAt(0) || 'U'}
        </div>
        <div 
          className="flex flex-col ml-3 cursor-pointer" 
          onClick={onProfileClick}
        >
          <span className="font-medium text-wastewise-dark-gray text-sm">
            {user?.businessName || user?.email?.split('@')[0] || 'User'}
          </span>
          <span className="text-xs text-wastewise-gray truncate max-w-[140px]">
            {user?.email}
          </span>
        </div>
        <button 
          className="ml-auto text-wastewise-gray hover:text-wastewise-dark-gray"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
