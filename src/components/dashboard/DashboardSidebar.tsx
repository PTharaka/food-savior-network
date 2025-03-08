
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  UserRound,
  History
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  disabled?: boolean;
  requiredTier?: string;
  onClick?: () => void;
}

const NavItem = ({ icon, label, href, active, disabled, requiredTier, onClick }: NavItemProps) => {
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

export const DashboardSidebar = ({ className }: { className?: string }) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { subscription } = useSubscription();
  const path = location.pathname;

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
            icon={<LayoutDashboard className="h-4 w-4" />} 
            label="Dashboard" 
            active={path === '/dashboard'} 
          />
          
          <div className="text-xs uppercase text-wastewise-gray font-medium mt-6 mb-2 px-3">
            Waste Management
          </div>
          
          <NavItem 
            href="/dashboard/waste-tracking" 
            icon={<Recycle className="h-4 w-4" />} 
            label="Waste Tracking" 
            active={path.includes('/waste-tracking')} 
          />
          <NavItem 
            href="/dashboard/donations" 
            icon={<Package className="h-4 w-4" />} 
            label="Donation Management" 
            active={path.includes('/donations')} 
          />
          <NavItem 
            href="/dashboard/tax-reports" 
            icon={<ClipboardCheck className="h-4 w-4" />} 
            label="Tax Compliance" 
            active={path.includes('/tax-reports')} 
          />
          <NavItem 
            href="/dashboard/analytics" 
            icon={<BarChart3 className="h-4 w-4" />} 
            label="Analytics" 
            active={path.includes('/analytics')} 
          />
          
          <div className="text-xs uppercase text-wastewise-gray font-medium mt-6 mb-2 px-3">
            Advanced Features
          </div>
          
          <NavItem 
            href="/dashboard/predictions" 
            icon={<Sparkles className="h-4 w-4" />} 
            label="AI Predictions" 
            active={path.includes('/predictions')} 
            requiredTier="pro"
          />
          <NavItem 
            href="/dashboard/leaderboard" 
            icon={<Users className="h-4 w-4" />} 
            label="Employee Leaderboard" 
            active={path.includes('/leaderboard')} 
            requiredTier="starter"
          />
          <NavItem 
            href="/dashboard/community-impact" 
            icon={<Globe className="h-4 w-4" />} 
            label="Community Impact" 
            active={path.includes('/community-impact')} 
          />
          <NavItem 
            href="/dashboard/history" 
            icon={<History className="h-4 w-4" />} 
            label="Activity History" 
            active={path.includes('/history')} 
          />
          
          <div className="text-xs uppercase text-wastewise-gray font-medium mt-6 mb-2 px-3">
            Account
          </div>
          
          <NavItem 
            href="/dashboard/settings" 
            icon={<Settings className="h-4 w-4" />} 
            label="Settings" 
            active={path.includes('/settings')} 
          />
          <NavItem 
            href="/dashboard/subscription" 
            icon={<BadgeDollarSign className="h-4 w-4" />} 
            label="Subscription" 
            active={path.includes('/subscription')} 
          />
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-wastewise-light-gray/20 flex items-center">
        <div className="bg-wastewise-green/20 h-10 w-10 rounded-full flex items-center justify-center text-lg font-bold text-wastewise-green cursor-pointer" 
             onClick={() => window.location.href = '/dashboard/settings'}>
          {user?.businessName ? user.businessName.charAt(0) : user?.email?.charAt(0) || 'U'}
        </div>
        <div className="flex flex-col ml-3 cursor-pointer" onClick={() => window.location.href = '/dashboard/settings'}>
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
