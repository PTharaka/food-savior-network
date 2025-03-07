
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import {
  BarChart3,
  Package,
  FileText,
  Users,
  LifeBuoy,
  Settings,
  LogOut,
  Home,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
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
  const isLocked = requiredTier && !subscription.isFeatureAvailable(requiredTier);
  
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
    <div className={cn("h-full flex flex-col border-r border-wastewise-light-gray/20 bg-white/80", className)}>
      <div className="p-4">
        <div className="flex items-center gap-2">
          <span className="text-wastewise-green text-xl font-bold">WasteWise</span>
          <Badge 
            className={cn(
              "ml-auto",
              subscription.tier === 'free' ? 'bg-wastewise-light-gray/50 text-wastewise-dark-gray' : '',
              subscription.tier === 'starter' ? 'bg-wastewise-light-green text-wastewise-dark-green' : '',
              subscription.tier === 'pro' ? 'bg-wastewise-green text-white' : '',
              subscription.tier === 'enterprise' ? 'bg-wastewise-dark-green text-white' : ''
            )}
          >
            {subscription.tier.charAt(0).toUpperCase() + subscription.tier.slice(1)}
          </Badge>
        </div>

        <div className="mt-6 flex items-center gap-4 px-2">
          <div className="bg-wastewise-green/20 h-10 w-10 rounded-full flex items-center justify-center text-lg font-bold text-wastewise-green">
            {user?.businessName ? user.businessName.charAt(0) : user?.email?.charAt(0) || 'U'}
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-wastewise-dark-gray">
              {user?.businessName || user?.email || 'User'}
            </span>
            <span className="text-xs text-wastewise-gray truncate max-w-[140px]">
              {user?.email}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto py-2 px-4">
        <nav className="grid gap-1">
          <NavItem 
            href="/dashboard" 
            icon={<Home className="h-4 w-4" />} 
            label="Overview" 
            active={path === '/dashboard'} 
          />
          <NavItem 
            href="/dashboard/waste-tracking" 
            icon={<BarChart3 className="h-4 w-4" />} 
            label="Waste Tracking" 
            active={path.includes('/waste-tracking')} 
          />
          <NavItem 
            href="/dashboard/donations" 
            icon={<Package className="h-4 w-4" />} 
            label="Donations" 
            active={path.includes('/donations')} 
          />
          <NavItem 
            href="/dashboard/tax-reports" 
            icon={<FileText className="h-4 w-4" />} 
            label="Tax Reports" 
            active={path.includes('/tax-reports')}
            requiredTier="pro"
          />
          <NavItem 
            href="/dashboard/analytics" 
            icon={<Sparkles className="h-4 w-4" />} 
            label="Advanced Analytics" 
            active={path.includes('/analytics')}
            requiredTier="starter" 
          />
          <NavItem 
            href="/dashboard/community-impact" 
            icon={<Users className="h-4 w-4" />} 
            label="Community Impact" 
            active={path.includes('/community-impact')}
          />
        </nav>

        <div className="mt-6 pt-6 border-t border-wastewise-light-gray/20">
          <nav className="grid gap-1">
            <NavItem 
              href="/dashboard/settings" 
              icon={<Settings className="h-4 w-4" />} 
              label="Settings" 
              active={path.includes('/settings')} 
            />
            <NavItem 
              href="#" 
              icon={<LifeBuoy className="h-4 w-4" />} 
              label="Help & Support" 
            />
            <Button
              variant="ghost"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all w-full justify-start text-wastewise-gray hover:bg-wastewise-red/10 hover:text-wastewise-red"
              onClick={logout}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </nav>
        </div>
      </div>

      {subscription.isTrialing && (
        <div className="p-4 bg-yellow-50/80 border-t border-yellow-100">
          <div className="text-sm">
            <p className="font-medium text-yellow-800">Trial expires in {Math.ceil((new Date(subscription.trialEndsAt || '').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days</p>
            <p className="text-yellow-600 text-xs mt-1">Select a plan to continue using premium features</p>
            <Button size="sm" className="mt-2 w-full" onClick={() => window.location.href = '/pricing'}>
              Upgrade Now
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardSidebar;
