
import React from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface DashboardHeaderProps {
  userName: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName }) => {
  const today = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' } as const;
  const formattedDate = today.toLocaleDateString('en-US', options);

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
      <div>
        <h1 className="text-xl font-semibold text-gray-800">
          Welcome, {userName}
        </h1>
        <p className="text-sm text-gray-500">{formattedDate}</p>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            className="pl-9 pr-4 py-2 w-64 bg-gray-50 border-gray-200 focus:bg-white"
            placeholder="Search anything..."
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">/</div>
        </div>
        <button className="relative p-2">
          <span className="sr-only">Notifications</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
          </svg>
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
