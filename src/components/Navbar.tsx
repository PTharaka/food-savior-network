
import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [logout, navigate]);

  const scrollToSection = useCallback((sectionId: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.pathname, navigate]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-10',
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-wastewise-green text-2xl font-bold">WasteWise</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {isAuthenticated && !isLandingPage ? (
            <>
              <Link to="/dashboard" className="text-wastewise-dark-gray hover:text-wastewise-green transition-colors">
                Dashboard
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
              <button 
                onClick={() => scrollToSection('features')} 
                className="text-wastewise-dark-gray hover:text-wastewise-green transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')} 
                className="text-wastewise-dark-gray hover:text-wastewise-green transition-colors"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('pricing')} 
                className="text-wastewise-dark-gray hover:text-wastewise-green transition-colors"
              >
                Pricing
              </button>
              <Link 
                to="/about" 
                className="text-wastewise-dark-gray hover:text-wastewise-green transition-colors"
              >
                About Us
              </Link>
              <Link to="/login" className="text-wastewise-dark-gray hover:text-wastewise-green transition-colors">
                Login
              </Link>
              <Link to="/signup" className="btn-primary">
                Get Early Access
              </Link>
            </>
          )}
        </nav>

        <button 
          className="md:hidden text-wastewise-dark-gray"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={cn(
        'fixed inset-0 bg-white z-40 pt-20 px-6 transition-transform duration-300 ease-in-out transform md:hidden',
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      )}>
        <nav className="flex flex-col space-y-6">
          {isAuthenticated && !isLandingPage ? (
            <>
              <Link
                to="/dashboard" 
                className="text-xl font-medium text-wastewise-dark-gray hover:text-wastewise-green transition-colors"
                onClick={closeMobileMenu}
              >
                Dashboard
              </Link>
              <button 
                className="text-xl font-medium text-wastewise-dark-gray hover:text-wastewise-red transition-colors flex items-center"
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => scrollToSection('features')} 
                className="text-xl font-medium text-wastewise-dark-gray hover:text-wastewise-green transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')} 
                className="text-xl font-medium text-wastewise-dark-gray hover:text-wastewise-green transition-colors"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('pricing')} 
                className="text-xl font-medium text-wastewise-dark-gray hover:text-wastewise-green transition-colors"
              >
                Pricing
              </button>
              <Link
                to="/about" 
                className="text-xl font-medium text-wastewise-dark-gray hover:text-wastewise-green transition-colors"
                onClick={closeMobileMenu}
              >
                About Us
              </Link>
              <Link
                to="/login" 
                className="text-xl font-medium text-wastewise-dark-gray hover:text-wastewise-green transition-colors"
                onClick={closeMobileMenu}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="btn-primary text-center"
                onClick={closeMobileMenu}
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
