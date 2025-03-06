
import React, { useState, useEffect } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-10',
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-wastewise-green text-2xl font-bold">WasteWise</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-wastewise-dark-gray hover:text-wastewise-green transition-colors">
                Dashboard
              </Link>
              <Link to="/profile" className="text-wastewise-dark-gray hover:text-wastewise-green transition-colors">
                Profile
              </Link>
              <Button 
                variant="outline"
                className="text-wastewise-dark-gray hover:text-wastewise-red"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <a href="#features" className="text-wastewise-dark-gray hover:text-wastewise-green transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-wastewise-dark-gray hover:text-wastewise-green transition-colors">
                How It Works
              </a>
              <a href="#pricing" className="text-wastewise-dark-gray hover:text-wastewise-green transition-colors">
                Pricing
              </a>
              <Link to="/login" className="text-wastewise-dark-gray hover:text-wastewise-green transition-colors">
                Login
              </Link>
              <Link to="/signup" className="btn-primary">
                Get Early Access
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-wastewise-dark-gray"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        'fixed inset-0 bg-white z-40 pt-20 px-6 transition-transform duration-300 ease-in-out transform md:hidden',
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      )}>
        <nav className="flex flex-col space-y-6">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard" 
                className="text-xl font-medium text-wastewise-dark-gray hover:text-wastewise-green transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/profile" 
                className="text-xl font-medium text-wastewise-dark-gray hover:text-wastewise-green transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <button 
                className="text-xl font-medium text-wastewise-dark-gray hover:text-wastewise-red transition-colors flex items-center"
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </>
          ) : (
            <>
              <a 
                href="#features" 
                className="text-xl font-medium text-wastewise-dark-gray hover:text-wastewise-green transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                className="text-xl font-medium text-wastewise-dark-gray hover:text-wastewise-green transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a 
                href="#pricing" 
                className="text-xl font-medium text-wastewise-dark-gray hover:text-wastewise-green transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <Link
                to="/login" 
                className="text-xl font-medium text-wastewise-dark-gray hover:text-wastewise-green transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="btn-primary text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Early Access
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
