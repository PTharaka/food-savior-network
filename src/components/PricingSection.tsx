
import React, { useEffect, useRef, useState } from 'react';
import { Check, HelpCircle } from 'lucide-react';

const plans = [
  {
    name: "Freemium",
    price: "Free",
    description: "Perfect for small businesses just getting started with waste tracking.",
    features: [
      "Basic waste tracking (50 logs/month)",
      "Simple analytics dashboard",
      "Email support"
    ],
    cta: "Get Started",
    ctaColor: "btn-secondary",
    highlight: false
  },
  {
    name: "Starter",
    price: "$49",
    period: "/month",
    description: "Ideal for growing businesses ready to optimize their waste management.",
    features: [
      "Advanced analytics dashboard",
      "3 POS integrations",
      "10 donation alerts/month",
      "Basic tax report generation",
      "Email & chat support"
    ],
    cta: "Subscribe Now",
    ctaColor: "btn-primary",
    highlight: true
  },
  {
    name: "Pro",
    price: "$199",
    period: "/month",
    description: "For established businesses seeking comprehensive waste management.",
    features: [
      "Unlimited waste tracking",
      "Unlimited donation alerts",
      "Full tax automation",
      "API access",
      "Custom reporting",
      "Priority support"
    ],
    cta: "Contact Sales",
    ctaColor: "btn-secondary",
    highlight: false
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for large operations with complex needs.",
    features: [
      "White-label reporting",
      "Dedicated account manager",
      "Custom integrations",
      "Advanced analytics",
      "Multi-location support",
      "24/7 support"
    ],
    cta: "Contact Sales",
    ctaColor: "btn-secondary",
    highlight: false
  }
];

const PricingSection: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const planRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    if (planRefs.current) {
      planRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    }

    return () => {
      if (planRefs.current) {
        planRefs.current.forEach((ref) => {
          if (ref) observer.unobserve(ref);
        });
      }
    };
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="bg-wastewise-green/10 text-wastewise-dark-green rounded-full px-4 py-1 text-sm font-medium inline-block mb-4">
            Simple Pricing
          </div>
          <h2 className="heading-lg mb-4">Plans for businesses of all sizes</h2>
          <p className="text-wastewise-gray text-lg max-w-2xl mx-auto">
            Choose the plan that best fits your needs. All plans include access to our core platform.
          </p>

          <div className="flex items-center justify-center mt-8">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-l-full ${
                !isAnnual
                  ? 'bg-wastewise-green text-white'
                  : 'bg-wastewise-light-gray/50 text-wastewise-dark-gray'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-r-full ${
                isAnnual
                  ? 'bg-wastewise-green text-white'
                  : 'bg-wastewise-light-gray/50 text-wastewise-dark-gray'
              }`}
            >
              Annual (Save 20%)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => {
            // Calculate annual price with 20% discount if applicable
            const displayPrice = plan.price === "Custom" || plan.price === "Free" 
              ? plan.price 
              : isAnnual 
                ? `$${Math.floor(parseInt(plan.price.replace('$', '')) * 12 * 0.8)}`
                : plan.price;
            
            const displayPeriod = plan.period && (isAnnual ? "/year" : plan.period);
            
            return (
              <div
                key={index}
                ref={(el) => (planRefs.current[index] = el)}
                className={`glass-panel p-6 ${
                  plan.highlight
                    ? 'border-2 border-wastewise-green relative'
                    : 'border border-wastewise-light-gray/50'
                } card-hover opacity-0`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-wastewise-green text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-end justify-center mb-2">
                    <span className="text-3xl font-bold">{displayPrice}</span>
                    {displayPeriod && <span className="text-wastewise-gray">{displayPeriod}</span>}
                  </div>
                  <p className="text-wastewise-gray text-sm">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start">
                      <Check className="h-5 w-5 text-wastewise-green flex-shrink-0 mt-0.5" />
                      <span className="ml-2 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <a
                    href="#contact"
                    className={`w-full flex items-center justify-center ${
                      plan.ctaColor === 'btn-primary' ? 'btn-primary' : 'btn-secondary'
                    }`}
                  >
                    {plan.cta}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 glass-panel p-8 max-w-4xl mx-auto">
          <div className="flex items-start">
            <HelpCircle className="text-wastewise-green h-6 w-6 flex-shrink-0 mt-1" />
            <div className="ml-4">
              <h3 className="text-xl font-bold mb-2">Transaction Fees</h3>
              <p className="text-wastewise-gray">
                A 5% transaction fee applies to donations facilitated through premium partners 
                (e.g., composting facilities). This fee helps us maintain and improve our network 
                of partners and ensure the highest quality service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
