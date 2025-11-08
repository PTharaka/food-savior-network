import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MapPin, TrendingUp, Globe } from 'lucide-react';

interface LocationData {
  id: string;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  address: string;
  impactPercentage: number;
  category: 'donation' | 'waste';
}

interface ImpactReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locations: LocationData[];
}

const ImpactReportModal: React.FC<ImpactReportModalProps> = ({ open, onOpenChange, locations }) => {
  const donationLocations = locations.filter(l => l.category === 'donation');
  const wasteLocations = locations.filter(l => l.category === 'waste');
  
  const totalDonationPercentage = donationLocations.reduce((sum, l) => sum + l.impactPercentage, 0);
  const totalWastePercentage = wasteLocations.reduce((sum, l) => sum + l.impactPercentage, 0);
  const avgDonationPercentage = donationLocations.length > 0 
    ? Math.round(totalDonationPercentage / donationLocations.length) 
    : 0;
  const avgWastePercentage = wasteLocations.length > 0 
    ? Math.round(totalWastePercentage / wasteLocations.length) 
    : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Globe className="h-6 w-6 mr-2 text-primary" />
            Detailed Impact Report
          </DialogTitle>
          <DialogDescription>
            Comprehensive overview of all community impact locations
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Summary Statistics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-green-900">Donation Centers</h3>
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-green-700">{donationLocations.length}</p>
              <p className="text-sm text-green-600 mt-1">{avgDonationPercentage}% average impact</p>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-amber-900">Waste Centers</h3>
                <TrendingUp className="h-5 w-5 text-amber-600" />
              </div>
              <p className="text-3xl font-bold text-amber-700">{wasteLocations.length}</p>
              <p className="text-sm text-amber-600 mt-1">{avgWastePercentage}% average impact</p>
            </div>
          </div>

          {/* Donation Locations */}
          {donationLocations.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center">
                <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                Donation Centers
              </h3>
              <div className="space-y-2">
                {donationLocations.map((location) => (
                  <div key={location.id} className="bg-card p-3 rounded-lg border border-border hover:border-green-500 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{location.name}</h4>
                        <p className="text-sm text-muted-foreground">{location.type}</p>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {location.address}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-green-600">{location.impactPercentage}%</span>
                        <p className="text-xs text-muted-foreground">impact</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Waste Locations */}
          {wasteLocations.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center">
                <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
                Waste Centers
              </h3>
              <div className="space-y-2">
                {wasteLocations.map((location) => (
                  <div key={location.id} className="bg-card p-3 rounded-lg border border-border hover:border-amber-500 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{location.name}</h4>
                        <p className="text-sm text-muted-foreground">{location.type}</p>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {location.address}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-amber-600">{location.impactPercentage}%</span>
                        <p className="text-xs text-muted-foreground">impact</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {locations.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Globe className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No location data available</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImpactReportModal;
