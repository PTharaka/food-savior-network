
import React, { useEffect, useRef, useState } from 'react';
import { Check, HelpCircle } from 'lucide-react';

const plans = [
  {
    name: "Free",
    price: "Free",
    description: "Perfect for small businesses just getting started with waste tracking.",
    features: [
      "Up to 50 waste entries/month",
      "Basic analytics dashboard",
      "3 donation alerts/month",
      "Email support",
      "Community forum access"
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
      "Up to 500 waste entries/month",
      "Advanced analytics & insights",
      "3 POS system integrations",
      "10 donation alerts/month",
      "AI-powered recommendations",
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
      "Up to 5,000 waste entries/month",
      "Unlimited donation alerts",
      "10 POS system integrations",
      "Full tax compliance tools",
      "API access for custom integrations",
      "Priority support"
    ],
    cta: "Start Pro Trial",
    ctaColor: "btn-secondary",
    highlight: false
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for large operations with complex needs.",
    features: [
      "Unlimited waste entries",
      "Unlimited POS integrations",
      "White-label reporting",
      "Dedicated account manager",
      "Custom integrations & workflows",
      "24/7 premium support"
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

          <div className="flex items-center justify-center mt-8 gap-0">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2.5 text-sm font-medium rounded-l-full transition-all duration-300 ${
                !isAnnual
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2.5 text-sm font-medium rounded-r-full transition-all duration-300 ${
                isAnnual
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Annual <span className="hidden sm:inline">(Save 20%)</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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
                className={`glass-panel p-6 flex flex-col h-full ${
                  plan.highlight
                    ? 'border-2 border-primary ring-2 ring-primary/20 shadow-xl scale-105 lg:scale-110 relative'
                    : 'border border-border'
                } card-hover opacity-0 transition-all duration-300`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2 text-foreground">{plan.name}</h3>
                  <div className="flex items-end justify-center mb-2 gap-1">
                    <span className="text-3xl md:text-4xl font-bold text-foreground">{displayPrice}</span>
                    {displayPeriod && <span className="text-muted-foreground text-sm mb-1">{displayPeriod}</span>}
                  </div>
                  <p className="text-muted-foreground text-sm px-2">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="ml-3 text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <a
                    href="/signup"
                    className={`w-full flex items-center justify-center text-center ${
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
