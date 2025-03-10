
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
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-wastewise-dark-green mb-4 hover-3d">
              Minimalistic Analytics for Smart Decisions
            </h2>
            <p className="text-lg text-wastewise-gray max-w-2xl mx-auto">
              See your impact at a glance with our intuitive visualization tools. 
              Turn data into actionable insights - no complexity, just clarity.
            </p>
          </div>
          
          <div className="card-3d bg-white p-6 rounded-xl shadow-md border border-wastewise-light-green/20 mb-8 transform hover:scale-[1.02] transition-all duration-300">
            <InteractiveAnalyticsDemo />
          </div>
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
