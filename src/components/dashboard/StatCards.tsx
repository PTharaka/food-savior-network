
import React from 'react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  changePercentage: number;
  changePeriod: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, changePercentage, changePeriod }) => {
  const isPositive = changePercentage > 0;
  
  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <div className="text-3xl font-bold">{value}</div>
        <div className={`flex items-center text-xs ${isPositive ? 'text-green-600' : 'text-red-600'} mt-1`}>
          {isPositive ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <path d="m5 12 5 5 9-9"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <path d="m19 9-7 7-7-7"></path>
            </svg>
          )}
          <span>{`${isPositive ? '+' : ''}${changePercentage}% engagement`}</span>
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
        title="Total posts" 
        value="224" 
        changePercentage={55} 
        changePeriod="since last month" 
      />
      
      <StatCard 
        title="Post likes" 
        value="2.4 M" 
        changePercentage={-25} 
        changePeriod="since last month" 
      />
      
      <StatCard 
        title="Total comments" 
        value="3.5 M" 
        changePercentage={15} 
        changePeriod="since last month" 
      />
    </div>
  );
};

export default StatCards;
