
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import PricingSection from '@/components/PricingSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="bg-wastewise-cream min-h-screen overflow-hidden">
      <Navbar />
      
      <HeroSection />
      
      <FeaturesSection />
      
      <HowItWorksSection />
      
      <PricingSection />
      
      <ContactSection />
      
      <Footer />
    </div>
  );
};

export default Index;
