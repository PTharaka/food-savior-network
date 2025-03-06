
import React, { useEffect, useRef } from 'react';
import { BarChart3, Calendar, FileText, MapPin, Recycle, DollarSign } from 'lucide-react';

const features = [
  {
    icon: <BarChart3 className="h-10 w-10 text-wastewise-green" />,
    title: "Waste Tracking",
    description: "Seamlessly log waste via barcode scans, POS integration, or manual entry with real-time inventory updates."
  },
  {
    icon: <MapPin className="h-10 w-10 text-wastewise-green" />,
    title: "Donation Management",
    description: "Connect with local food banks and charities through geolocation matching and instant alerts."
  },
  {
    icon: <FileText className="h-10 w-10 text-wastewise-green" />,
    title: "Tax Compliance",
    description: "Automatically generate tax forms and audit-ready reports for maximum deductions."
  },
  {
    icon: <Calendar className="h-10 w-10 text-wastewise-green" />,
    title: "Predictive Analytics",
    description: "Forecast surplus and optimize inventory using AI that learns from your sales trends."
  },
  {
    icon: <Recycle className="h-10 w-10 text-wastewise-green" />,
    title: "Impact Metrics",
    description: "Track cost savings, waste reduction, CO2 impact, and community benefit in real-time."
  },
  {
    icon: <DollarSign className="h-10 w-10 text-wastewise-green" />,
    title: "ROI Dashboard",
    description: "Visualize your return on investment with customizable reports and analytics."
  }
];

const FeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    if (featureRefs.current) {
      featureRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    }

    return () => {
      if (featureRefs.current) {
        featureRefs.current.forEach((ref) => {
          if (ref) observer.unobserve(ref);
        });
      }
    };
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="bg-wastewise-green/10 text-wastewise-dark-green rounded-full px-4 py-1 text-sm font-medium inline-block mb-4">
            Powerful Features
          </div>
          <h2 className="heading-lg mb-4">Everything you need to manage food waste effectively</h2>
          <p className="text-wastewise-gray text-lg max-w-2xl mx-auto">
            Our platform combines intuitive tracking, smart analytics, and seamless donation
            management to turn your food waste challenge into an opportunity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (featureRefs.current[index] = el)}
              className="glass-panel p-6 card-hover opacity-0"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 bg-wastewise-green/10 p-3 rounded-full inline-block">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-wastewise-gray">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
