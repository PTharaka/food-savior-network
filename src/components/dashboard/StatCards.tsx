
import React from 'react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Leaf } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  changePercentage: number;
  changePeriod: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, changePercentage, changePeriod, icon, color }) => {
  const isPositive = changePercentage > 0;
  
  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
          <div className={`p-2 rounded-md ${color}`}>
            {icon}
          </div>
        </div>
        <div className="text-3xl font-bold">{value}</div>
        <div className={`flex items-center text-xs ${isPositive ? 'text-green-600' : 'text-red-600'} mt-1`}>
          {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
          <span>{`${isPositive ? '+' : ''}${changePercentage}%`}</span>
          <span className="text-gray-500 ml-1">{changePeriod}</span>
        </div>
      </CardHeader>
    </Card>
  );
};

const StatCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard 
        title="Waste Reduction" 
        value="224 kg" 
        changePercentage={55} 
        changePeriod="since last month" 
        icon={<Leaf className="h-5 w-5 text-green-500" />}
        color="bg-green-50"
      />
      
      <StatCard 
        title="Cost Savings" 
        value="$2,456" 
        changePercentage={15} 
        changePeriod="since last month" 
        icon={<DollarSign className="h-5 w-5 text-blue-500" />}
        color="bg-blue-50"
      />
      
      <StatCard 
        title="CO2 Reduction" 
        value="3.5 tons" 
        changePercentage={25} 
        changePeriod="since last month" 
        icon={<Leaf className="h-5 w-5 text-purple-500" />}
        color="bg-purple-50"
      />
    </div>
  );
};

export default StatCards;
