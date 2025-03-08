
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clipboard, Barcode, ShoppingCart } from 'lucide-react';

const WasteTrackingMetrics: React.FC = () => {
  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Waste Tracking Methods</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Barcode className="h-4 w-4 mr-2 text-blue-500" />
                <span className="text-sm font-medium">Barcode Scanning</span>
              </div>
              <span className="text-sm text-gray-500">42%</span>
            </div>
            <Progress value={42} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ShoppingCart className="h-4 w-4 mr-2 text-green-500" />
                <span className="text-sm font-medium">POS Integration</span>
              </div>
              <span className="text-sm text-gray-500">35%</span>
            </div>
            <Progress value={35} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clipboard className="h-4 w-4 mr-2 text-purple-500" />
                <span className="text-sm font-medium">Manual Entry</span>
              </div>
              <span className="text-sm text-gray-500">23%</span>
            </div>
            <Progress value={23} className="h-2" />
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-semibold mb-2">Inventory Stats</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-xs text-blue-500 font-medium">Items Tracked</div>
                <div className="text-lg font-bold">1,234</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-xs text-green-500 font-medium">Real-time Updates</div>
                <div className="text-lg font-bold">98%</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WasteTrackingMetrics;
