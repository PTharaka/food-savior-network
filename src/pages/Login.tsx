
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';
import { Info, Leaf, LogIn } from 'lucide-react';
import EcoBackground from '@/components/EcoBackground';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error('Invalid credentials');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail('demo@wastewise.com');
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wastewise-cream to-wastewise-light-green/20 relative overflow-hidden">
      {/* Ambient Background Animation */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
        <EcoBackground />
      </div>
      
      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md p-8 glass-panel bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-wastewise-light-green/20 animate-fade-in">
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gradient-to-br from-wastewise-green to-wastewise-light-green rounded-full flex items-center justify-center shadow-lg">
          <Leaf className="h-12 w-12 text-white" />
        </div>

        <div className="text-center mb-10 mt-8">
          <h1 className="text-2xl font-bold text-wastewise-dark-green mt-4">Welcome Back</h1>
          <p className="text-wastewise-gray mt-2">Log in to continue your sustainability journey</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-wastewise-dark-gray">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/50 border-wastewise-light-green/30 focus:border-wastewise-green focus:ring-wastewise-green/20"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className="text-wastewise-dark-gray">Password</Label>
              <Link to="/forgot-password" className="text-sm text-wastewise-green hover:text-wastewise-dark-green transition-colors">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-white/50 border-wastewise-light-green/30 focus:border-wastewise-green focus:ring-wastewise-green/20"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-wastewise-green to-wastewise-light-green hover:from-wastewise-dark-green hover:to-wastewise-green text-white font-medium py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : (
              <>
                <LogIn size={18} />
                <span>Log In</span>
              </>
            )}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-wastewise-gray">
            Don't have an account?{' '}
            <Link to="/signup" className="text-wastewise-green hover:text-wastewise-dark-green font-medium transition-colors">
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-6 p-4 bg-wastewise-green/5 rounded-lg border border-wastewise-green/20 animate-pulse-light">
          <button 
            onClick={fillDemoCredentials}
            className="flex items-center justify-center w-full text-sm text-wastewise-dark-green hover:text-wastewise-green gap-2 transition-colors"
          >
            <Info size={16} />
            <span>Use demo account: demo@wastewise.com / demo123</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
