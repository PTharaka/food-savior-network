
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        <a href="#" className="flex items-center space-x-2">
          <span className="text-wastewise-green text-2xl font-bold">WasteWise</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-wastewise-dark-gray hover:text-wastewise-green transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-wastewise-dark-gray hover:text-wastewise-green transition-colors">
            How It Works
          </a>
          <a href="#pricing" className="text-wastewise-dark-gray hover:text-wastewise-green transition-colors">
            Pricing
          </a>
          <a href="#contact" className="btn-primary">
            Get Early Access
          </a>
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
          <a 
            href="#contact" 
            className="btn-primary text-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            Get Early Access
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
