
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    number: "01",
    title: "User Onboarding",
    description: "Sign up and connect your existing POS or inventory systems. Our platform integrates seamlessly with popular systems like Square and Toast.",
    delay: 100,
  },
  {
    number: "02",
    title: "Track Waste",
    description: "Log spoiled or expired items via barcode scans, manual entry, or direct POS synchronization. Get real-time insights into your waste patterns.",
    delay: 200,
  },
  {
    number: "03",
    title: "Surplus Redistribution",
    description: "Our AI predicts surplus and sends automated alerts to nearby food banks or composters, making donation logistics effortless.",
    delay: 300,
  },
  {
    number: "04",
    title: "Tax Automation",
    description: "Generate IRS Form 8283 (U.S.) or regional equivalents automatically for donation tax deductions, ensuring compliance and maximizing benefits.",
    delay: 400,
  },
  {
    number: "05",
    title: "Analytics & Reporting",
    description: "Access detailed dashboards showing cost savings, CO2 reduction, and meals donated to measure your environmental and social impact.",
    delay: 500,
  },
];

const HowItWorksSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (stepRefs.current) {
      stepRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    }

    return () => {
      if (stepRefs.current) {
        stepRefs.current.forEach((ref) => {
          if (ref) observer.unobserve(ref);
        });
      }
    };
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="bg-wastewise-green/10 text-wastewise-dark-green rounded-full px-4 py-1 text-sm font-medium inline-block mb-4">
            Simple Process
          </div>
          <h2 className="heading-lg mb-4">How WasteWise Works</h2>
          <p className="text-wastewise-gray text-lg max-w-2xl mx-auto">
            Our intuitive platform makes managing food waste simpler than ever before with these five easy steps
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-wastewise-light-gray transform -translate-x-1/2"></div>

          {/* Steps */}
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => (stepRefs.current[index] = el)}
              className={`relative mb-16 last:mb-0 opacity-0 flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
              style={{ transitionDelay: `${step.delay}ms` }}
            >
              <div className="md:w-1/2 flex items-center justify-center md:justify-end pb-8 md:pb-0">
                <div className={`glass-panel p-8 max-w-md card-hover ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                  <div className="flex items-start mb-4">
                    <span className="text-4xl font-bold text-wastewise-green/20">{step.number}</span>
                    <h3 className="text-xl font-bold ml-4 pt-1">{step.title}</h3>
                  </div>
                  <p className="text-wastewise-gray">{step.description}</p>
                </div>
              </div>

              {/* Timeline dot */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-5 h-5 rounded-full bg-wastewise-green"></div>
              </div>

              <div className="md:w-1/2"></div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a href="#contact" className="btn-primary inline-flex items-center justify-center gap-2">
            Start Reducing Waste Today <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
