
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bell, MapPin, ArrowUpRight } from 'lucide-react';

const DonationAlerts: React.FC = () => {
  // Sample donation opportunities data
  const donationOpportunities = [
    {
      id: 1,
      organization: "Local Food Bank",
      distance: "1.2 miles",
      needsUrgently: "Bread, Vegetables",
      expiresIn: "5 hours"
    },
    {
      id: 2,
      organization: "Community Shelter",
      distance: "2.8 miles",
      needsUrgently: "Prepared Meals",
      expiresIn: "8 hours"
    },
    {
      id: 3,
      organization: "City Compost Center",
      distance: "3.5 miles",
      needsUrgently: "Fruit Scraps, Coffee Grounds",
      expiresIn: "12 hours"
    }
  ];

  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Bell className="h-5 w-5 mr-2 text-amber-500" />
          Donation Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {donationOpportunities.map((item) => (
            <div key={item.id} className="border rounded-md p-3 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{item.organization}</div>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {item.distance}
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-400" />
              </div>
              <div className="mt-2 text-sm">
                <span className="text-gray-600">Needs: </span>
                <span className="font-medium">{item.needsUrgently}</span>
              </div>
              <div className="mt-1 text-xs text-amber-600">
                Expires in: {item.expiresIn}
              </div>
            </div>
          ))}
          
          <div className="text-center mt-4">
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View all donation opportunities →
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DonationAlerts;
