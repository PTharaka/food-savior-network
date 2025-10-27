
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BarChart3, Calendar, FileText, MapPin, Recycle, DollarSign, Globe, Award, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-wastewise-cream">
      <Navbar />
      
      <main className="animate-fade-in">
        {/* Hero Section */}
        <section className="py-20 px-6 bg-wastewise-light-green/10 animate-fade-in">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="heading-lg mb-6">About WasteWise</h1>
            <p className="text-xl text-wastewise-gray max-w-3xl mx-auto mb-8">
              We're on a mission to combat the $1.2 trillion global food waste crisis 
              while empowering businesses to save costs and meet ESG goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="btn-primary">
                <Link to="/signup">Start Reducing Waste</Link>
              </Button>
              <Button asChild variant="outline" className="btn-secondary">
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-wastewise-green/10 text-wastewise-dark-green rounded-full px-4 py-1 text-sm font-medium inline-block mb-4">
                  Our Mission
                </div>
                <h2 className="heading-md mb-6">Turn Food Waste into Savings and Social Good</h2>
                <p className="text-wastewise-gray mb-6">
                  WasteWise is a B2B SaaS platform that helps restaurants, supermarkets, and food distributors 
                  track, manage, and reduce food waste by automating donations to local charities, generating 
                  tax-compliant reports, and providing actionable analytics.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Globe className="h-6 w-6 text-wastewise-green mt-1" />
                    <div>
                      <h3 className="font-bold">Environmental Impact</h3>
                      <p className="text-wastewise-gray">Reducing CO2 emissions from food waste in landfills.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="h-6 w-6 text-wastewise-green mt-1" />
                    <div>
                      <h3 className="font-bold">Social Responsibility</h3>
                      <p className="text-wastewise-gray">Feeding communities in need through efficient donation management.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-6 w-6 text-wastewise-green mt-1" />
                    <div>
                      <h3 className="font-bold">Regulatory Compliance</h3>
                      <p className="text-wastewise-gray">Helping businesses meet local food waste regulations.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="glass-panel p-6">
                <img 
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2013&q=80" 
                  alt="Food waste reduction" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Tech Stack Section */}
        <section className="py-20 px-6 bg-wastewise-light-green/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="bg-wastewise-green/10 text-wastewise-dark-green rounded-full px-4 py-1 text-sm font-medium inline-block mb-4">
                Technology
              </div>
              <h2 className="heading-md mb-4">Built with Modern Technology</h2>
              <p className="text-wastewise-gray text-lg max-w-2xl mx-auto">
                Our platform leverages cutting-edge technology to provide a seamless and efficient experience
                for managing food waste.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass-panel p-6">
                <h3 className="text-xl font-bold mb-3">Frontend</h3>
                <p className="text-wastewise-gray mb-4">
                  Built with React.js and Next.js for web, with React Native for mobile applications, 
                  providing a responsive and intuitive user experience.
                </p>
                <div className="bg-wastewise-green/10 py-1 px-3 rounded-full text-sm inline-block">
                  React.js
                </div>
              </div>
              
              <div className="glass-panel p-6">
                <h3 className="text-xl font-bold mb-3">Backend</h3>
                <p className="text-wastewise-gray mb-4">
                  Powered by Node.js and Express.js, with Python for AI and analytics components,
                  ensuring fast and reliable performance.
                </p>
                <div className="bg-wastewise-green/10 py-1 px-3 rounded-full text-sm inline-block">
                  Node.js
                </div>
              </div>
              
              <div className="glass-panel p-6">
                <h3 className="text-xl font-bold mb-3">Database</h3>
                <p className="text-wastewise-gray mb-4">
                  Using PostgreSQL with PostGIS for geospatial queries and Redis for caching,
                  allowing for efficient data storage and retrieval.
                </p>
                <div className="bg-wastewise-green/10 py-1 px-3 rounded-full text-sm inline-block">
                  PostgreSQL
                </div>
              </div>
              
              <div className="glass-panel p-6">
                <h3 className="text-xl font-bold mb-3">Cloud Infrastructure</h3>
                <p className="text-wastewise-gray mb-4">
                  Deployed on AWS with EC2 and S3, using Firebase for authentication and storage,
                  and Vercel for hosting.
                </p>
                <div className="bg-wastewise-green/10 py-1 px-3 rounded-full text-sm inline-block">
                  AWS
                </div>
              </div>
              
              <div className="glass-panel p-6">
                <h3 className="text-xl font-bold mb-3">Integrations</h3>
                <p className="text-wastewise-gray mb-4">
                  Seamless connections with Square API, Toast API, Google Maps API, and Stripe for payments,
                  creating a comprehensive ecosystem.
                </p>
                <div className="bg-wastewise-green/10 py-1 px-3 rounded-full text-sm inline-block">
                  API Integrations
                </div>
              </div>
              
              <div className="glass-panel p-6">
                <h3 className="text-xl font-bold mb-3">Analytics & AI</h3>
                <p className="text-wastewise-gray mb-4">
                  Leveraging Python with Pandas and Scikit-learn, deployed with FastAPI,
                  for intelligent insights and predictions.
                </p>
                <div className="bg-wastewise-green/10 py-1 px-3 rounded-full text-sm inline-block">
                  Machine Learning
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-6 bg-wastewise-green text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="heading-md mb-6">Ready to Transform Your Food Waste Management?</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8 text-white/90">
              Join thousands of businesses already saving money, reducing waste, and making a positive impact.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-white text-wastewise-green hover:bg-wastewise-light-gray rounded-full px-6 py-3 font-medium">
                <Link to="/signup">Get Started Free</Link>
              </Button>
              <Button asChild variant="outline" className="border-white hover:bg-white/20 text-white rounded-full px-6 py-3 font-medium">
                <Link to="/contact">Request Demo</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
