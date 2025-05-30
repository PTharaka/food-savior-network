
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Suspense } from "react";
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-wastewise-green"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SubscriptionProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/waste-tracking" element={
                  <ProtectedRoute>
                    <Dashboard initialView="waste-tracking" />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/donations" element={
                  <ProtectedRoute>
                    <Dashboard initialView="donations" />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/tax-reports" element={
                  <ProtectedRoute>
                    <Dashboard initialView="tax-reports" />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/analytics" element={
                  <ProtectedRoute>
                    <Dashboard initialView="analytics" />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/predictions" element={
                  <ProtectedRoute>
                    <Dashboard initialView="predictions" />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/leaderboard" element={
                  <ProtectedRoute>
                    <Dashboard initialView="leaderboard" />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/community-impact" element={
                  <ProtectedRoute>
                    <Dashboard initialView="community-impact" />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/history" element={
                  <ProtectedRoute>
                    <Dashboard initialView="history" />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/subscription" element={
                  <ProtectedRoute>
                    <Dashboard initialView="subscription" />
                  </ProtectedRoute>
                } />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </SubscriptionProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
