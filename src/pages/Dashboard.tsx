import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, PackageCheck, PieChart, Users, MessageSquare, Settings, HelpCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-wastewise-cream">
      <Navbar />
      <div className="container mx-auto py-12 px-6">
        <header className="mb-8">
          <h1 className="heading-xl font-poppins text-wastewise-dark-gray">
            Welcome back, {user.businessName || user.email}!
          </h1>
          <p className="text-wastewise-gray text-lg">
            Here's a snapshot of your WasteWise dashboard.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-wastewise-dark-gray flex items-center gap-2">
                <PieChart className="mr-2 h-5 w-5 text-wastewise-green" />
                Waste Reduction
              </CardTitle>
              <CardDescription className="text-wastewise-gray">Track your progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-wastewise-dark-green">68%</div>
              <Progress value={68} className="h-2 bg-wastewise-light-gray/30">
                <div className="h-full bg-wastewise-green rounded-full" style={{ width: '68%' }} />
              </Progress>
              <p className="text-sm text-wastewise-gray mt-2">vs. last month</p>
            </CardContent>
          </Card>

          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-wastewise-dark-gray flex items-center gap-2">
                <PackageCheck className="mr-2 h-5 w-5 text-wastewise-green" />
                Donations
              </CardTitle>
              <CardDescription className="text-wastewise-gray">Food sent to those in need</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-wastewise-dark-green">234 kg</div>
              <Progress value={45} className="h-2 bg-wastewise-light-gray/30">
                <div className="h-full bg-wastewise-green rounded-full" style={{ width: '45%' }} />
              </Progress>
              <p className="text-sm text-wastewise-gray mt-2">vs. last month</p>
            </CardContent>
          </Card>

          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-wastewise-dark-gray flex items-center gap-2">
                <Users className="mr-2 h-5 w-5 text-wastewise-green" />
                Community Impact
              </CardTitle>
              <CardDescription className="text-wastewise-gray">Meals provided</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-wastewise-dark-green">876</div>
              <Progress value={75} className="h-2 bg-wastewise-light-gray/30">
                <div className="h-full bg-wastewise-green rounded-full" style={{ width: '75%' }} />
              </Progress>
              <p className="text-sm text-wastewise-gray mt-2">vs. last month</p>
            </CardContent>
          </Card>

          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-wastewise-dark-gray flex items-center gap-2">
                <Check className="mr-2 h-5 w-5 text-wastewise-green" />
                Tax Benefits
              </CardTitle>
              <CardDescription className="text-wastewise-gray">Claimed this year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-wastewise-dark-green">$1,250</div>
              <Progress value={90} className="h-2 bg-wastewise-light-gray/30">
                <div className="h-full bg-wastewise-green rounded-full" style={{ width: '90%' }} />
              </Progress>
              <p className="text-sm text-wastewise-gray mt-2">vs. last year</p>
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="glass-panel lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-wastewise-dark-gray">
                Recent Activity
              </CardTitle>
              <CardDescription className="text-wastewise-gray">
                Latest updates and insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="divide-y divide-wastewise-light-gray/30">
                <li className="py-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-wastewise-dark-gray">
                        Donated 50 kg of food to Local Shelter
                      </p>
                      <p className="text-sm text-wastewise-gray">
                        2 hours ago
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-wastewise-green" />
                  </div>
                </li>
                <li className="py-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-wastewise-dark-gray">
                        Generated tax report for Q3
                      </p>
                      <p className="text-sm text-wastewise-gray">
                        Yesterday
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-wastewise-green" />
                  </div>
                </li>
                <li className="py-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-wastewise-dark-gray">
                        New insights on waste trends
                      </p>
                      <p className="text-sm text-wastewise-gray">
                        3 days ago
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-wastewise-green" />
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-wastewise-dark-gray">
                Quick Actions
              </CardTitle>
              <CardDescription className="text-wastewise-gray">
                Manage your account
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Button variant="secondary" className="justify-start" onClick={() => navigate('/profile')}>
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </Button>
              <Button variant="secondary" className="justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
              <Button variant="secondary" className="justify-start">
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & FAQs
              </Button>
              <Button variant="destructive" className="justify-start" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
