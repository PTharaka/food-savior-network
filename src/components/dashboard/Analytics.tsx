
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart, BarChart2, PieChart, LineChart, Share2, Download } from 'lucide-react';

const AnalyticsPanel = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Cost Savings</CardTitle>
        <CardDescription>Total money saved from waste reduction</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold text-wastewise-dark-green mb-2">$3,450</div>
          <div className="text-sm text-wastewise-green">↑ 15% vs. last period</div>
          <div className="w-full h-36 mt-4 bg-wastewise-beige rounded-md flex items-center justify-center">
            <BarChart className="h-8 w-8 text-wastewise-gray/50" />
          </div>
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Waste Reduction</CardTitle>
        <CardDescription>Total food waste prevented</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold text-wastewise-dark-green mb-2">750 kg</div>
          <div className="text-sm text-wastewise-green">↑ 8% vs. last period</div>
          <div className="w-full h-36 mt-4 bg-wastewise-beige rounded-md flex items-center justify-center">
            <LineChart className="h-8 w-8 text-wastewise-gray/50" />
          </div>
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Meals Donated</CardTitle>
        <CardDescription>Estimated meals provided through donations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold text-wastewise-dark-green mb-2">1,240</div>
          <div className="text-sm text-wastewise-green">↑ 22% vs. last period</div>
          <div className="w-full h-36 mt-4 bg-wastewise-beige rounded-md flex items-center justify-center">
            <BarChart2 className="h-8 w-8 text-wastewise-gray/50" />
          </div>
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">CO₂ Impact</CardTitle>
        <CardDescription>Environmental impact of your waste reduction</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold text-wastewise-dark-green mb-2">1.8 tons</div>
          <div className="text-sm text-wastewise-green">↑ 12% vs. last period</div>
          <div className="w-full h-36 mt-4 bg-wastewise-beige rounded-md flex items-center justify-center">
            <PieChart className="h-8 w-8 text-wastewise-gray/50" />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-wastewise-dark-gray">Analytics Dashboard</h2>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 size={16} /> Share Report
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} /> Export Data
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="impact">Impact</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <AnalyticsPanel />
          
          <Card>
            <CardHeader>
              <CardTitle>Waste Distribution</CardTitle>
              <CardDescription>
                Analysis of waste types and categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-wastewise-beige rounded-md flex items-center justify-center">
                <p className="text-wastewise-gray">Detailed chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Waste Trends</CardTitle>
              <CardDescription>
                Historical waste data and patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-wastewise-beige rounded-md flex items-center justify-center">
                <p className="text-wastewise-gray">Trend analysis chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact">
          <Card>
            <CardHeader>
              <CardTitle>Community Impact</CardTitle>
              <CardDescription>
                Social and environmental impact metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-wastewise-beige rounded-md flex items-center justify-center">
                <p className="text-wastewise-gray">Impact visualization will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions">
          <Card>
            <CardHeader>
              <CardTitle>Waste Predictions</CardTitle>
              <CardDescription>
                AI-powered forecasts for inventory optimization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-wastewise-beige rounded-md flex items-center justify-center">
                <p className="text-wastewise-gray">Predictive analytics chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
