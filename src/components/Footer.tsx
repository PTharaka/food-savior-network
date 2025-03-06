
import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, ArrowUpCircle } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-wastewise-green text-2xl font-bold">WasteWise</span>
            </div>
            <p className="text-wastewise-gray mb-6 max-w-md">
              Turn food waste into savings and social good. Our platform helps businesses track, 
              manage, and reduce food waste while automating donations and generating tax-compliant reports.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-wastewise-green/10 text-wastewise-green p-2 rounded-full hover:bg-wastewise-green hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-wastewise-green/10 text-wastewise-green p-2 rounded-full hover:bg-wastewise-green hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-wastewise-green/10 text-wastewise-green p-2 rounded-full hover:bg-wastewise-green hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="bg-wastewise-green/10 text-wastewise-green p-2 rounded-full hover:bg-wastewise-green hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-wastewise-gray hover:text-wastewise-green transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-wastewise-gray hover:text-wastewise-green transition-colors">Pricing</a></li>
              <li><a href="#" className="text-wastewise-gray hover:text-wastewise-green transition-colors">Integrations</a></li>
              <li><a href="#" className="text-wastewise-gray hover:text-wastewise-green transition-colors">Case Studies</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-wastewise-gray hover:text-wastewise-green transition-colors">Blog</a></li>
              <li><a href="#" className="text-wastewise-gray hover:text-wastewise-green transition-colors">Documentation</a></li>
              <li><a href="#" className="text-wastewise-gray hover:text-wastewise-green transition-colors">Support Center</a></li>
              <li><a href="#" className="text-wastewise-gray hover:text-wastewise-green transition-colors">Webinars</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-wastewise-gray hover:text-wastewise-green transition-colors">About Us</a></li>
              <li><a href="#" className="text-wastewise-gray hover:text-wastewise-green transition-colors">Careers</a></li>
              <li><a href="#" className="text-wastewise-gray hover:text-wastewise-green transition-colors">Partners</a></li>
              <li><a href="#contact" className="text-wastewise-gray hover:text-wastewise-green transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-wastewise-light-gray pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-wastewise-gray text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} WasteWise. All rights reserved.
          </div>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 items-center">
            <div className="flex space-x-6">
              <a href="#" className="text-wastewise-gray hover:text-wastewise-green text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-wastewise-gray hover:text-wastewise-green text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-wastewise-gray hover:text-wastewise-green text-sm transition-colors">Cookie Policy</a>
            </div>
            
            <button 
              onClick={scrollToTop}
              className="group flex items-center space-x-2 text-wastewise-dark-gray hover:text-wastewise-green transition-colors"
            >
              <span className="text-sm font-medium">Back to top</span>
              <ArrowUpCircle className="h-5 w-5 transform group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
