
import React, { useState } from 'react';
import { SendIcon, CheckCircle } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log('Form submitted:', formState);
    // Show success message
    setSubmitted(true);
    // Reset form
    setFormState({
      name: '',
      email: '',
      company: '',
      message: '',
    });

    // Reset the submitted state after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section id="contact" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-wastewise-green/10 text-wastewise-dark-green rounded-full px-4 py-1 text-sm font-medium inline-block mb-4">
              Get Early Access
            </div>
            <h2 className="heading-lg mb-4">Ready to reduce waste and increase savings?</h2>
            <p className="text-wastewise-gray text-lg mb-8">
              Join our early access program and be among the first to experience the future of food waste management. 
              Our team will contact you to set up a personalized demo.
            </p>

            {submitted ? (
              <div className="glass-panel p-6 flex items-center space-x-4 animate-fade-in">
                <CheckCircle className="h-8 w-8 text-wastewise-green" />
                <div>
                  <h3 className="text-xl font-bold mb-1">Thank you!</h3>
                  <p className="text-wastewise-gray">
                    We've received your request and will be in touch shortly.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-wastewise-dark-gray mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-wastewise-light-gray rounded-lg focus:ring-2 focus:ring-wastewise-green focus:border-wastewise-green transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-wastewise-dark-gray mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-wastewise-light-gray rounded-lg focus:ring-2 focus:ring-wastewise-green focus:border-wastewise-green transition-all"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-wastewise-dark-gray mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formState.company}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-wastewise-light-gray rounded-lg focus:ring-2 focus:ring-wastewise-green focus:border-wastewise-green transition-all"
                    placeholder="Your company"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-wastewise-dark-gray mb-1">
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-wastewise-light-gray rounded-lg focus:ring-2 focus:ring-wastewise-green focus:border-wastewise-green transition-all"
                    placeholder="Tell us about your business and needs..."
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary flex items-center justify-center gap-2">
                  Request Early Access <SendIcon size={18} />
                </button>
              </form>
            )}
          </div>

          <div className="order-1 lg:order-2 glass-panel p-8 animate-fade-in">
            <div className="bg-wastewise-green/10 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold mb-3">Why Join Early?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mr-3 bg-wastewise-green/20 p-1 rounded-full">
                    <CheckCircle className="h-5 w-5 text-wastewise-green" />
                  </div>
                  <div>
                    <span className="font-medium block">Priority Onboarding</span>
                    <span className="text-sm text-wastewise-gray">
                      Get personalized setup and training from our team
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 bg-wastewise-green/20 p-1 rounded-full">
                    <CheckCircle className="h-5 w-5 text-wastewise-green" />
                  </div>
                  <div>
                    <span className="font-medium block">Founder's Pricing</span>
                    <span className="text-sm text-wastewise-gray">
                      Lock in our best rates for life
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 bg-wastewise-green/20 p-1 rounded-full">
                    <CheckCircle className="h-5 w-5 text-wastewise-green" />
                  </div>
                  <div>
                    <span className="font-medium block">Feature Input</span>
                    <span className="text-sm text-wastewise-gray">
                      Help shape our roadmap with your feedback
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="relative">
              <blockquote className="text-wastewise-dark-gray text-lg italic mb-4">
                "WasteWise has cut our food waste costs by 32% in just three months. The automated tax forms alone saved us countless hours."
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-wastewise-green/20 rounded-full flex items-center justify-center text-wastewise-green font-bold">
                  JD
                </div>
                <div className="ml-3">
                  <div className="font-medium">Jane Doe</div>
                  <div className="text-sm text-wastewise-gray">Operations Manager, Fresh Eats Co.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
