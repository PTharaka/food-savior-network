import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import PricingSection from '@/components/PricingSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import InteractiveAnalyticsDemo from '@/components/InteractiveAnalyticsDemo';

const Index = () => {
  return (
    <div className="bg-wastewise-cream min-h-screen overflow-hidden">
      <Navbar />
      
      <HeroSection />
      
      <FeaturesSection />
      
      <div className="py-20 bg-wastewise-light-beige">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-wastewise-dark-green mb-4">
              Interactive Analytics Dashboard
            </h2>
            <p className="text-lg text-wastewise-gray max-w-2xl mx-auto">
              Visualize your waste reduction journey with our intuitive analytics tools.
              Make data-driven decisions to maximize your environmental impact.
            </p>
          </div>
          
          <InteractiveAnalyticsDemo />
        </div>
      </div>
      
      <HowItWorksSection />
      
      <PricingSection />
      
      <ContactSection />
      
      <Footer />
    </div>
  );
};

export default Index;
