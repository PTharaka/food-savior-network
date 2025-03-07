
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { toast } from "sonner";
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');

  const handleEarlyAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    // In a real application, this would send the email to your backend
    toast.success("Thank you for your interest! Check your email for access details.");
    
    // For the demo, simulate getting early access by redirecting to login
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  const featuresData = [
    {
      title: "Waste Tracking",
      description: "Barcode scanning, POS integration, and manual entry with real-time inventory updates.",
      items: ["Barcode scanning", "POS integration", "Manual entry", "Real-time inventory updates"]
    },
    {
      title: "Donation Management",
      description: "Geolocation-based matching with food banks and composters with instant alerts.",
      items: ["Geolocation matching", "SMS/Email alerts", "Pickup scheduling", "Donation history"]
    },
    {
      title: "Tax Compliance",
      description: "Auto-filled tax forms, audit-ready reports, and regulatory compliance alerts.",
      items: ["Auto-filled tax forms", "Audit-ready reports", "Digital receipts", "Compliance tracking"]
    },
    {
      title: "Analytics & Insights",
      description: "Cost savings, waste reduction, CO2 impact dashboards, and predictive analytics.",
      items: ["Cost savings dashboard", "Waste reduction metrics", "CO2 impact visualization", "Predictive analytics"]
    }
  ];

  return (
    <div className="min-h-screen bg-wastewise-cream">
      <HeroSection />
      <FeaturesSection />

      <section id="how-it-works" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="bg-wastewise-green/10 text-wastewise-dark-green rounded-full px-4 py-1 text-sm font-medium inline-block mb-4">
              How It Works
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-wastewise-dark-gray">
              Turning food waste into impact has never been easier
            </h2>
            <p className="text-wastewise-gray text-lg max-w-2xl mx-auto">
              Our platform makes it simple to track, manage, and reduce food waste while automating donations and compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-wastewise-green text-white flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Connect Your Systems</h3>
              <p className="text-wastewise-gray">
                Integrate with your POS or inventory system, or use our standalone tools to track waste.
              </p>
            </div>
            <div className="glass-panel p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-wastewise-green text-white flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Log and Manage Waste</h3>
              <p className="text-wastewise-gray">
                Track waste through barcode scans or manual entry, and get AI-powered surplus predictions.
              </p>
            </div>
            <div className="glass-panel p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-wastewise-green text-white flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Create Impact</h3>
              <p className="text-wastewise-gray">
                Donate surplus food, track your environmental impact, and maximize tax benefits.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="features-details" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="bg-wastewise-green/10 text-wastewise-dark-green rounded-full px-4 py-1 text-sm font-medium inline-block mb-4">
              Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-wastewise-dark-gray">
              Comprehensive food waste management
            </h2>
            <p className="text-wastewise-gray text-lg max-w-2xl mx-auto">
              From tracking to donating to reporting, we've got you covered with these powerful features
            </p>
          </div>

          {featuresData.map((feature, index) => (
            <div key={index} className="glass-panel p-8 mb-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold mb-3 text-wastewise-dark-green">{feature.title}</h3>
                  <p className="text-wastewise-gray mb-6">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-wastewise-green" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:w-1/2 bg-wastewise-beige rounded-lg flex items-center justify-center min-h-[200px]">
                  <p className="text-wastewise-gray text-sm">Feature illustration</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="py-20 px-6 bg-wastewise-dark-green text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to reduce food waste and increase profits?</h2>
          <p className="text-lg mb-8 opacity-90">
            Get early access to WasteWise and start turning your food waste challenge into an opportunity.
          </p>
          
          <form onSubmit={handleEarlyAccess} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Label htmlFor="email" className="sr-only">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border-wastewise-light-green placeholder:text-white/50 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button type="submit" className="bg-white text-wastewise-dark-green hover:bg-wastewise-light-green hover:text-white">
                Get Early Access <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </form>
          
          <div className="mt-8 opacity-75 text-sm">
            <p>Demo login available for testing:</p>
            <p>Email: demo@wastewise.com | Password: demo123</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
