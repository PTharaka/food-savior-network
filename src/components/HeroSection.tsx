
import React, { useEffect, useState } from 'react';
import { ArrowRight, TrendingDown, DollarSign, Heart, Leaf, BarChart3, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { icon: DollarSign, value: "$2.4M+", label: "Total Savings", color: "text-green-600" },
  { icon: TrendingDown, value: "850K lbs", label: "Waste Reduced", color: "text-blue-600" },
  { icon: Heart, value: "45K+", label: "Meals Donated", color: "text-red-500" },
];

const floatingElements = [
  { icon: Leaf, delay: 0, duration: 3 },
  { icon: BarChart3, delay: 0.5, duration: 3.5 },
  { icon: Users, delay: 1, duration: 4 },
];

const HeroSection: React.FC = () => {
  const [animatedValues, setAnimatedValues] = useState({ savings: 0, waste: 0, meals: 0 });

  useEffect(() => {
    // Animate numbers on load
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setAnimatedValues({
        savings: Math.floor(2400000 * progress),
        waste: Math.floor(850000 * progress),
        meals: Math.floor(45000 * progress),
      });
      
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center py-20 px-6 overflow-hidden bg-gradient-to-br from-background via-background to-accent/5">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Floating icons */}
        {floatingElements.map((item, index) => (
          <motion.div
            key={index}
            className="absolute text-primary/20"
            initial={{ y: 0, x: 0 }}
            animate={{ 
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              top: `${20 + index * 30}%`,
              right: `${10 + index * 15}%`
            }}
          >
            <item.icon size={48} />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div 
            className="order-2 lg:order-1 space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-6 py-2 text-sm font-semibold mb-6 border border-primary/20">
                <Leaf size={16} />
                The Future of Food Waste Management
              </span>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Turn Food Waste into{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Savings
              </span>{" "}
              and{" "}
              <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                Social Good
              </span>
            </motion.h1>

            <motion.p 
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              WasteWise helps restaurants, supermarkets, and food distributors track, 
              manage, and reduce food waste while automating donations and generating 
              tax-compliant reports.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <a 
                href="#contact" 
                className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Get Early Access 
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </a>
              <a 
                href="#how-it-works" 
                className="inline-flex items-center justify-center gap-2 bg-background border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary/5 hover:scale-105 transition-all duration-300"
              >
                How It Works
              </a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div 
              className="flex items-center gap-6 pt-6 border-t border-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div 
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-background flex items-center justify-center text-primary-foreground text-xs font-bold"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">200+ businesses</span> fighting food waste
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Stats Cards */}
          <motion.div 
            className="order-1 lg:order-2 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-sm"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02, translateY: -5 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${index === 0 ? 'from-green-500/20 to-green-600/10' : index === 1 ? 'from-blue-500/20 to-blue-600/10' : 'from-red-500/20 to-pink-600/10'}`}>
                    <stat.icon className={stat.color} size={32} />
                  </div>
                  <div className="flex-1">
                    <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${index === 0 ? 'from-green-600 to-green-800' : index === 1 ? 'from-blue-600 to-blue-800' : 'from-red-500 to-pink-600'} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Additional visual element */}
            <motion.div
              className="relative h-64 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-2xl overflow-hidden border border-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <BarChart3 className="text-primary mx-auto" size={64} />
                  <p className="text-2xl font-bold text-foreground">Real-time Analytics</p>
                  <p className="text-muted-foreground">Track your impact instantly</p>
                </div>
              </div>
              {/* Animated bars */}
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around h-32 px-8 pb-4 gap-2">
                {[40, 60, 45, 70, 55, 80].map((height, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 bg-primary/30 rounded-t"
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
