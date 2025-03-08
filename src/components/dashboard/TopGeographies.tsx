
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MapPin, ExternalLink } from 'lucide-react';

const TopGeographies: React.FC = () => {
  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-blue-500" />
          Community Impact Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[200px] bg-blue-50 rounded-md overflow-hidden mb-3">
          <img 
            src="/lovable-uploads/1fd0de91-6c4d-4b28-8fcf-9ba96c793760.png" 
            alt="Donation Impact Map"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/80 backdrop-blur-sm px-3 py-2 rounded-md shadow-sm">
              <div className="text-sm font-medium">Donation Coverage</div>
              <div className="text-xs text-gray-600">5 mile radius</div>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 mt-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
              <span>Food Banks (4)</span>
            </div>
            <span className="text-green-600 font-medium">76% donations</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
              <span>Shelters (2)</span>
            </div>
            <span className="text-amber-600 font-medium">15% donations</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
              <span>Composting (3)</span>
            </div>
            <span className="text-blue-600 font-medium">9% waste</span>
          </div>
        </div>
        
        <button className="w-full mt-4 text-sm flex items-center justify-center text-blue-600 hover:text-blue-800 font-medium">
          View detailed impact report
          <ExternalLink className="h-3 w-3 ml-1" />
        </button>
      </CardContent>
    </Card>
  );
};

export default TopGeographies;
