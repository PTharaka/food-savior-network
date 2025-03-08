
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const geographiesData = [
  { country: 'United States of America', rate: 65.1 },
  { country: 'Bangladesh', rate: 39.2 },
  { country: 'China', rate: 50.5 },
  { country: 'Australia', rate: 9.2 },
];

const TopGeographies: React.FC = () => {
  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Top geographies</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left font-medium text-gray-500 py-2">Country</th>
              <th className="text-right font-medium text-gray-500 py-2">Rate</th>
            </tr>
          </thead>
          <tbody>
            {geographiesData.map((item, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-3 text-gray-800">{item.country}</td>
                <td className="py-3 text-right">
                  <div className="flex items-center justify-end">
                    <span className="mr-2 text-gray-800">{item.rate}%</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-teal-500 h-2 rounded-full" 
                        style={{ width: `${item.rate}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default TopGeographies;
