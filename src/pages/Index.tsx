
import React, { lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import PricingSection from '@/components/PricingSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const InteractiveAnalyticsDemo = lazy(() => import('@/components/InteractiveAnalyticsDemo'));

const Index = () => {
  return (
    <div className="bg-wastewise-cream min-h-screen overflow-hidden">
      <Navbar />
      
      <HeroSection />
      
      <FeaturesSection />
      
      <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
        <InteractiveAnalyticsDemo />
      </Suspense>
      
      <HowItWorksSection />
      
      <PricingSection />
      
      <ContactSection />
      
      <Footer />
    </div>
  );
};

export default Index;
