
import React, { useEffect, useState } from 'react';
import { ArrowRight, TrendingDown, DollarSign, Heart, Leaf, BarChart3, Users, TrendingUp, Zap, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

// Generate dynamic chart data
const generateChartData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map((month, index) => ({
    month,
    waste: 95 - (index * 12) - Math.random() * 5,
    saved: 15 + (index * 12) + Math.random() * 5,
    donations: 25 + (index * 10) + Math.random() * 8,
  }));
};

const HeroSection: React.FC = () => {
  const [animatedValues, setAnimatedValues] = useState({ savings: 0, waste: 0, meals: 0 });
  const [chartData, setChartData] = useState(generateChartData());
  const [activeMetric, setActiveMetric] = useState(0);

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

    // Refresh chart data periodically for live effect
    const chartTimer = setInterval(() => {
      setChartData(generateChartData());
    }, 3000);

    // Cycle through metrics
    const metricTimer = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % 3);
    }, 2000);

    return () => {
      clearInterval(timer);
      clearInterval(chartTimer);
      clearInterval(metricTimer);
    };
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
                className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
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
                  <motion.div 
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-background flex items-center justify-center text-primary-foreground text-xs font-bold cursor-pointer"
                    initial={{ opacity: 0, scale: 0, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ 
                      delay: 0.7 + i * 0.1,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                    whileHover={{ 
                      scale: 1.2,
                      y: -5,
                      zIndex: 10,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {i}
                  </motion.div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">200+ businesses</span> fighting food waste
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Futuristic Dashboard */}
          <motion.div 
            className="order-1 lg:order-2 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Dashboard Card */}
            <motion.div
              className="relative bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-xl border border-border/50 rounded-3xl p-8 shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 animate-pulse" />
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="text-primary animate-pulse" size={24} />
                      <h3 className="text-2xl font-bold text-foreground">Live Dashboard</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Real-time waste reduction analytics</p>
                  </div>
                  <motion.div
                    className="flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium text-foreground">Live</span>
                  </motion.div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { icon: TrendingUp, value: '↑ 28%', label: 'Growth', color: 'from-green-500 to-emerald-600' },
                    { icon: Zap, value: '94%', label: 'Efficiency', color: 'from-blue-500 to-cyan-600' },
                    { icon: Activity, value: 'Active', label: 'Status', color: 'from-purple-500 to-pink-600' }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className={`relative overflow-hidden rounded-xl p-4 bg-gradient-to-br ${stat.color} ${activeMetric === index ? 'ring-2 ring-white/50' : ''}`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      animate={activeMetric === index ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <stat.icon className="text-white/80 mb-2" size={20} />
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-white/70">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Line Chart */}
                <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-4 border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold text-foreground">Waste Reduction Trend</h4>
                    <div className="flex gap-4 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500" />
                        <span className="text-muted-foreground">Waste</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500" />
                        <span className="text-muted-foreground">Saved</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
                        <span className="text-muted-foreground">Donations</span>
                      </div>
                    </div>
                  </div>
                  
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorWaste" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="rgb(239, 68, 68)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="rgb(239, 68, 68)" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorSaved" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="rgb(34, 197, 94)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="rgb(34, 197, 94)" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="rgb(59, 130, 246)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="rgb(59, 130, 246)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
                      <XAxis 
                        dataKey="month" 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="waste" 
                        stroke="rgb(239, 68, 68)" 
                        strokeWidth={2}
                        fill="url(#colorWaste)"
                        animationDuration={1000}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="saved" 
                        stroke="rgb(34, 197, 94)" 
                        strokeWidth={2}
                        fill="url(#colorSaved)"
                        animationDuration={1000}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="donations" 
                        stroke="rgb(59, 130, 246)" 
                        strokeWidth={2}
                        fill="url(#colorDonations)"
                        animationDuration={1000}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>

            {/* Compact Stats Row */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="relative group bg-card border border-border rounded-xl p-4 hover:shadow-xl transition-all duration-300 backdrop-blur-sm overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${index === 0 ? 'from-green-500/10 to-green-600/5' : index === 1 ? 'from-blue-500/10 to-blue-600/5' : 'from-red-500/10 to-pink-600/5'}`} />
                  <div className="relative z-10">
                    <stat.icon className={`${stat.color} mb-2`} size={24} />
                    <div className={`text-xl font-bold bg-gradient-to-r ${index === 0 ? 'from-green-600 to-green-800' : index === 1 ? 'from-blue-600 to-blue-800' : 'from-red-500 to-pink-600'} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
