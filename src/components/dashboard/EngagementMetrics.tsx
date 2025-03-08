
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const engagementData = [
  { platform: 'Facebook', rate: '5.0%', change: -12.7 },
  { platform: 'Instagram', rate: '12.3%', change: 3.5 },
  { platform: 'LinkedIn', rate: '4.5%', change: -9.7 },
];

const EngagementMetrics: React.FC = () => {
  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Engagement rate metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-gray-500 mb-2">Engagement rate (per impression)</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left font-medium text-gray-500 py-2">Platform</th>
              <th className="text-right font-medium text-gray-500 py-2">Rate</th>
              <th className="text-right font-medium text-gray-500 py-2">% Change</th>
            </tr>
          </thead>
          <tbody>
            {engagementData.map((item, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-3 text-gray-800">{item.platform} engagement rate</td>
                <td className="py-3 text-right text-gray-800">{item.rate}</td>
                <td className="py-3 text-right">
                  <span className={`flex items-center justify-end ${item.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {item.change > 0 ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <path d="m5 12 7-7 7 7"></path>
                        <path d="M12 19V5"></path>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <path d="M12 5v14"></path>
                        <path d="m19 12-7 7-7-7"></path>
                      </svg>
                    )}
                    {Math.abs(item.change)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default EngagementMetrics;
