
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Send, Clock } from 'lucide-react';

type Donation = {
  id: string;
  organization: string;
  items: string;
  quantity: string;
  status: 'pending' | 'scheduled' | 'completed' | 'cancelled';
  date: string;
  address: string;
};

const demoData: Donation[] = [
  {
    id: '1',
    organization: 'City Food Bank',
    items: 'Bread, Vegetables',
    quantity: '10 kg',
    status: 'scheduled',
    date: '2023-11-10',
    address: '123 Main St, City'
  },
  {
    id: '2',
    organization: 'Shelter Kitchen',
    items: 'Dairy Products',
    quantity: '5 kg',
    status: 'pending',
    date: '2023-11-12',
    address: '456 Oak Ave, City'
  },
  {
    id: '3',
    organization: 'Community Pantry',
    items: 'Canned Goods',
    quantity: '15 kg',
    status: 'completed',
    date: '2023-11-01',
    address: '789 Pine Rd, City'
  },
];

const DonationManager: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-wastewise-dark-gray">Donation Manager</h2>
        <Button className="bg-wastewise-green text-white hover:bg-wastewise-dark-green">
          New Donation
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Donations</CardTitle>
          <CardDescription>Manage your food donations to local organizations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {demoData.map((donation) => (
              <div key={donation.id} className="border border-wastewise-light-gray rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-wastewise-dark-gray">{donation.organization}</h3>
                    <Badge variant={
                      donation.status === 'completed' ? 'default' :
                      donation.status === 'scheduled' ? 'outline' :
                      donation.status === 'pending' ? 'secondary' : 'destructive'
                    }>
                      {donation.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-wastewise-gray">Items: {donation.items}</p>
                  <p className="text-sm text-wastewise-gray">Quantity: {donation.quantity}</p>
                  <div className="flex items-center gap-2 text-sm text-wastewise-gray">
                    <Clock size={14} /> {donation.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-wastewise-gray">
                    <MapPin size={14} /> {donation.address}
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col gap-2 self-end sm:self-center">
                  <Button variant="outline" size="sm" className="whitespace-nowrap">
                    View Details
                  </Button>
                  {donation.status === 'pending' && (
                    <Button size="sm" className="bg-wastewise-green text-white hover:bg-wastewise-dark-green whitespace-nowrap">
                      <Send size={14} className="mr-2" /> Send Notification
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Nearby Organizations</CardTitle>
          <CardDescription>Food banks and charities in your area</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-wastewise-beige rounded-md flex items-center justify-center">
            <p className="text-wastewise-gray">Map will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationManager;
