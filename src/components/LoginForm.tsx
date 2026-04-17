
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';
import { Info } from 'lucide-react';

const LoginForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(email, password);
      onSuccess();
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel p-8 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-wastewise-dark-green mb-6 text-center">Log in to WasteWise</h2>
      
      <div className="bg-wastewise-beige/50 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-2">
          <Info size={18} className="text-wastewise-dark-green mt-0.5" />
          <div>
            <p className="text-sm text-wastewise-dark-gray">
              <strong>New here?</strong> Create an account using the <a href="/signup" className="text-wastewise-green underline font-medium">Sign Up</a> page. Email confirmation is required before login unless disabled.
            </p>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="text-sm text-wastewise-green hover:underline">
              Forgot password?
            </a>
          </div>
          <Input 
            id="password" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-wastewise-green hover:bg-wastewise-dark-green text-white"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Log in'}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
