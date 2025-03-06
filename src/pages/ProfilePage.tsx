
import React from 'react';
import UserProfile from '@/components/UserProfile';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-wastewise-cream">
      <header className="bg-white shadow-sm py-4 px-6 mb-6">
        <div className="max-w-7xl mx-auto flex items-center">
          <Link to="/dashboard">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-wastewise-dark-gray ml-4">Account Settings</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <UserProfile />
      </main>
    </div>
  );
};

export default ProfilePage;
