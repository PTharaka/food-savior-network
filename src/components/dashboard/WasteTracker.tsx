
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Barcode, FileSpreadsheet } from 'lucide-react';

type WasteItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  reason: string;
  date: string;
};

const demoItems: WasteItem[] = [
  { id: '1', name: 'Lettuce', quantity: 2.5, unit: 'kg', reason: 'Spoiled', date: '2023-11-01' },
  { id: '2', name: 'Bread', quantity: 4, unit: 'loaves', reason: 'Expired', date: '2023-11-02' },
  { id: '3', name: 'Tomatoes', quantity: 1.5, unit: 'kg', reason: 'Damaged', date: '2023-11-03' },
];

const WasteTracker: React.FC = () => {
  const [items, setItems] = useState<WasteItem[]>(demoItems);
  const [showForm, setShowForm] = useState(false);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-wastewise-dark-gray">Waste Tracker</h2>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Barcode size={16} /> Scan Barcode
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <FileSpreadsheet size={16} /> Import Data
          </Button>
          <Button 
            className="bg-wastewise-green text-white hover:bg-wastewise-dark-green flex items-center gap-2"
            onClick={() => setShowForm(!showForm)}
          >
            <Plus size={16} /> {showForm ? 'Cancel' : 'Add Waste Item'}
          </Button>
        </div>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Waste Item</CardTitle>
            <CardDescription>Log a new waste item to track</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="item-name">Item Name</Label>
                <Input id="item-name" placeholder="e.g., Lettuce" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Input id="unit" placeholder="kg, pounds, etc." />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Input id="reason" placeholder="Why was this item wasted?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <Button className="bg-wastewise-green text-white hover:bg-wastewise-dark-green">
                  Save Item
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-wastewise-light-gray">
            <thead className="bg-wastewise-beige">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-wastewise-dark-gray uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-wastewise-dark-gray uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-wastewise-dark-gray uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-wastewise-dark-gray uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-wastewise-dark-gray uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-wastewise-light-gray">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-wastewise-light-gray/10">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-wastewise-dark-gray">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-wastewise-gray">{item.quantity} {item.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-wastewise-gray">{item.reason}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-wastewise-gray">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <button className="text-wastewise-green hover:text-wastewise-dark-green mr-4">Edit</button>
                    <button className="text-red-500 hover:text-red-700">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WasteTracker;
