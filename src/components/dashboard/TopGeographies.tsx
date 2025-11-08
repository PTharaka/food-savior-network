import React, { useEffect, useRef, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MapPin, ExternalLink, Globe } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '@/integrations/supabase/client';
import ImpactReportModal from './ImpactReportModal';

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

const TopGeographies: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [mapError, setMapError] = useState<string | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    // Fetch charity locations from database
    const fetchLocations = async () => {
      try {
        const { data: charities, error } = await (supabase as any)
          .from('charity_organizations')
          .select('*')
          .eq('verified', true)
          .not('latitude', 'is', null)
          .not('longitude', 'is', null);

        if (error) {
          console.error('Error fetching charities:', error);
          return;
        }

        if (charities && charities.length > 0) {
          const mappedLocations: LocationData[] = charities.map((charity: any, index: number) => ({
            id: charity.id,
            name: charity.name,
            type: charity.type,
            latitude: Number(charity.latitude),
            longitude: Number(charity.longitude),
            address: charity.address,
            impactPercentage: Math.floor(Math.random() * 50) + 20, // Demo percentages
            category: index % 3 === 0 ? 'waste' : 'donation'
          }));
          setLocations(mappedLocations);
        } else {
          // Demo locations if no data
          setLocations([
            {
              id: '1',
              name: 'Downtown Food Bank',
              type: 'Food Bank',
              latitude: 40.7128,
              longitude: -74.0060,
              address: 'New York, NY',
              impactPercentage: 76,
              category: 'donation'
            },
            {
              id: '2',
              name: 'Community Shelter',
              type: 'Shelter',
              latitude: 51.5074,
              longitude: -0.1278,
              address: 'London, UK',
              impactPercentage: 15,
              category: 'donation'
            },
            {
              id: '3',
              name: 'Local Composting Center',
              type: 'Composting',
              latitude: -1.2921,
              longitude: 36.8219,
              address: 'Nairobi, Kenya',
              impactPercentage: 9,
              category: 'waste'
            },
            {
              id: '4',
              name: 'City Food Rescue',
              type: 'Food Bank',
              latitude: 34.0522,
              longitude: -118.2437,
              address: 'Los Angeles, CA',
              impactPercentage: 45,
              category: 'donation'
            }
          ]);
        }
      } catch (error) {
        console.error('Error in fetchLocations:', error);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
    
    if (!mapboxToken) {
      setMapError('Mapbox token not configured. Please add VITE_MAPBOX_TOKEN to your environment.');
      return;
    }

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [0, 20],
        zoom: 1.5,
        projection: 'globe' as any
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.current.scrollZoom.disable();

      // Add atmosphere with green tint
      map.current.on('style.load', () => {
        if (map.current) {
          map.current.setFog({
            color: 'rgb(230, 255, 240)',
            'high-color': 'rgb(180, 230, 200)',
            'horizon-blend': 0.3,
          });
        }
      });

      // Gentle globe rotation
      let userInteracting = false;
      const rotateCamera = () => {
        if (!map.current || userInteracting) return;
        const center = map.current.getCenter();
        center.lng -= 0.1;
        map.current.easeTo({ center, duration: 1000, easing: (n) => n });
      };

      map.current.on('mousedown', () => { userInteracting = true; });
      map.current.on('mouseup', () => { userInteracting = false; rotateCamera(); });
      map.current.on('moveend', rotateCamera);
      
      const rotationInterval = setInterval(rotateCamera, 1000);

      return () => {
        clearInterval(rotationInterval);
        map.current?.remove();
      };
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Failed to initialize map. Please check your Mapbox token.');
    }
  }, []);

  useEffect(() => {
    if (!map.current || locations.length === 0) return;

    // Wait for map to load
    if (!map.current.loaded()) {
      map.current.on('load', () => addMarkers());
    } else {
      addMarkers();
    }

    function addMarkers() {
      locations.forEach((location) => {
        const el = document.createElement('div');
        el.className = 'custom-marker';
        el.style.width = '48px';
        el.style.height = '48px';
        el.style.cursor = 'pointer';
        el.style.position = 'relative';
        
        const isDonation = location.category === 'donation';
        const gradient = isDonation 
          ? 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)'
          : 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)';
        
        el.innerHTML = `
          <div style="
            width: 100%;
            height: 100%;
            position: relative;
          ">
            <div style="
              position: absolute;
              width: 100%;
              height: 100%;
              background: ${gradient};
              border-radius: 50%;
              opacity: 0.3;
              animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
            "></div>
            <div style="
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 36px;
              height: 36px;
              background: ${gradient};
              border-radius: 50%;
              border: 3px solid white;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4), 0 0 0 2px ${isDonation ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'};
              display: flex;
              align-items: center;
              justify-content: center;
              animation: pulse 3s ease-in-out infinite;
            ">
              <svg width="20" height="20" fill="white" viewBox="0 0 24 24" style="filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
          </div>
        `;

        const popupGradient = isDonation 
          ? 'linear-gradient(135deg, #10b981, #059669)'
          : 'linear-gradient(135deg, #f59e0b, #d97706)';
        
        const popup = new mapboxgl.Popup({ offset: 30, closeButton: false })
          .setHTML(`
            <div style="padding: 12px; min-width: 200px; background: linear-gradient(to bottom, #ffffff, #f9fafb);">
              <h3 style="font-weight: bold; margin: 0 0 6px 0; color: #1f2937; font-size: 15px;">${location.name}</h3>
              <p style="margin: 4px 0; color: #6b7280; font-size: 13px; font-weight: 500;">${location.type}</p>
              <p style="margin: 4px 0; color: #9ca3af; font-size: 12px; display: flex; align-items: center;">
                <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24" style="margin-right: 4px;">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                </svg>
                ${location.address}
              </p>
              <div style="margin-top: 10px; padding: 8px; background: ${popupGradient}; border-radius: 6px; display: flex; align-items: center; justify-content: space-between;">
                <span style="font-weight: bold; color: white; font-size: 18px;">${location.impactPercentage}%</span>
                <span style="color: rgba(255,255,255,0.9); font-size: 12px; text-transform: uppercase; font-weight: 600;">${location.category}</span>
              </div>
            </div>
          `);

        new mapboxgl.Marker(el)
          .setLngLat([location.longitude, location.latitude])
          .setPopup(popup)
          .addTo(map.current!);
      });
    }
  }, [locations]);

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
    <Card className="border border-gray-200 transform hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Globe className="h-5 w-5 mr-2 text-wastewise-green" />
          Community Impact Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[300px] bg-gradient-to-br from-blue-50 to-green-50 rounded-md overflow-hidden mb-3">
          {mapError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 p-4">
              <div className="text-center">
                <Globe className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">{mapError}</p>
              </div>
            </div>
          ) : (
            <>
              <div ref={mapContainer} className="absolute inset-0" />
              <style>
                {`
                  @keyframes pulse {
                    0%, 100% { transform: translate(-50%, -50%) scale(1); }
                    50% { transform: translate(-50%, -50%) scale(1.08); }
                  }
                  @keyframes ping {
                    75%, 100% {
                      transform: scale(2);
                      opacity: 0;
                    }
                  }
                  .mapboxgl-popup-content {
                    border-radius: 12px !important;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.2) !important;
                    padding: 0 !important;
                    overflow: hidden;
                  }
                  .mapboxgl-popup-tip {
                    border-top-color: #f9fafb !important;
                  }
                  .mapboxgl-ctrl-logo {
                    display: none !important;
                  }
                `}
              </style>
            </>
          )}
        </div>
        
        <div className="space-y-2 mt-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
              <span>Donation Centers ({donationLocations.length})</span>
            </div>
            <span className="text-green-600 font-medium">{avgDonationPercentage}% avg impact</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-amber-500 mr-2 animate-pulse"></div>
              <span>Waste Centers ({wasteLocations.length})</span>
            </div>
            <span className="text-amber-600 font-medium">{avgWastePercentage}% avg impact</span>
          </div>
          
          <div className="flex items-center justify-between text-sm pt-2 border-t">
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-2 text-gray-500" />
              <span className="text-gray-600">Total Locations</span>
            </div>
            <span className="text-gray-900 font-semibold">{locations.length}</span>
          </div>
        </div>
        
        <button 
          onClick={() => setShowReportModal(true)}
          className="w-full mt-4 text-sm flex items-center justify-center text-blue-600 hover:text-blue-800 font-medium transform hover:scale-105 transition-all"
        >
          View detailed impact report
          <ExternalLink className="h-3 w-3 ml-1" />
        </button>
      </CardContent>
      
      <ImpactReportModal 
        open={showReportModal}
        onOpenChange={setShowReportModal}
        locations={locations}
      />
    </Card>
  );
};

export default TopGeographies;
