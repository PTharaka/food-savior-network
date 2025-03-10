
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MapPin, ExternalLink, Globe } from 'lucide-react';

const TopGeographies: React.FC = () => {
  return (
    <Card className="border border-gray-200 transform hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Globe className="h-5 w-5 mr-2 text-wastewise-green" />
          Community Impact Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[230px] bg-blue-50 rounded-md overflow-hidden mb-3">
          <div className="absolute inset-0 z-10">
            <svg width="100%" height="100%" viewBox="0 0 800 400" className="world-map">
              {/* World map SVG with donation impact markers */}
              <g className="map-base">
                <path 
                  d="M122,149.5c-2.8-3.2-7.3-3-10.8-0.6c-4.6,3-2.5-2.9-2.5-2.9l-4.4-0.2l-2.4-3.2l-2.9-2.7l-6.2-2.5l-3.5,0.5l-3.8-2.5l-7.8-2.5 c0,0-6.5-0.8-3.5-2.1s10.8-2.9,10.8-2.9l0.5-3.1l-2.8-3.1l-1.2-4.5c0,0-9.5-0.5-11-2.7s-9.5-3.8-9.5-3.8l-11.8,3.1l-13,1.2 l-15.2-3.8l-8.8-3.2c0,0-5.8-0.5-8,0.7s-2.5,4.4-4.5,6.1s-4.8,1-4.8,1L0,116.4l4.8,6.5l6.2,6.8c0,0,0.8,4.8,3.2,4.2s4.8-1.5,4.8-1.5 c0.9,4,3.5,6.1,3.5,6.1l6.2,2.9c0,0,5.5,0.2,5.5,3s-2,6.8-2,6.8l1.5,3.9l3.2,5.5c0,0,7.8,6.5,7.8,8s-3.8,5.5-3.8,5.5 s1.2,3.9,3.5,3.9s8-4,8-4l-0.2,5.2l2,6.1l4-5.8l1.5-3.9c0,0-0.5-3.9,2.5-3.9s3.9,1.2,5.8,1.5s7.5-3.1,7.5-3.1l3.2,0.8l3.8-1.5 l-1-3.9c0,0-3.8-3.5-1.8-5.2s4.5-2.5,4.5-2.5l1.2-2.5l-1.5-5.2c0,0-2.8-1.9-0.5-4.5S123.1,152,122,149.5z" 
                  fill="#e1f5fe" 
                  stroke="#0277bd" 
                  strokeWidth="1" 
                  className="north-america"
                />
                <path 
                  d="M170.8,318.5c0,0,0.8-2.8,3-2.8s4.5,1.8,6.2,1.2s2.2-3.5,2.2-3.5s-2.5-3-0.8-4.5s4-2.2,4-2.2l-1.8-3.5l1-3.9l-1.8-2.9 c0,0,0.8-2.8,3.8-2.2s5,2.5,5,2.5l0.8-2.2c0,0-7.2-4-5.5-7.8s6.5-4.5,6.5-4.5l-0.5-5.2c0,0-1.2-3.2,1.5-4.8s3.9-0.2,6.5-2 s-1.2-5.9-1.2-5.9l-5-3.2l-3.9-4.8l-4.5-0.6l-5-5.8l-6.2,0.2l-1-0.8l-5.8,3.2l-4.8-1.2l-5,2.2l-4.5-1.8l-6.5,0.8l-2.2-2.2 c0,0-6,1.5-8.2-0.8s-7.2-0.8-7.2-0.8l-4.2-2.8l-2.2-4.2l-4.5-2.5l-1.2-2.5h-4l-5.8-1.8l-5.8,1.8c0,0-8.5,0.8-9.8-1s-4.8-0.5-4.8-0.5 l-2.8,0.5l-2.8-2.5l-3.2,0.2c0,0-1.5,1.5-3,0s-5.8-2.2-5.8-2.2l-6.2,0.2c0,0-3.5-3.5-6.5-1.8s-3.2,3-3.2,3l-3.8-2.8l-2.8,1.5 c0,0-1,3-3.2,0.5s-3.8-4.5-3.8-4.5l-9.2-0.8l-7.5-3c0,0-3.5,0.5-2.2,1.8s4.5,1.5,4.5,1.5v2.2l-5.8,1.8l-2,2.2c0,0-0.2,3.2,2.2,3.8 s5.8,0.8,5.8,0.8l0.8,1.8l-2,2.2l-1.5,3.8c0,0,0.2,4.5,3.8,5s6.8,1.2,6.8,1.2l2.8,2.5l-0.8,2.5l-4.2,1.8l-2.8-0.5l-5.5,3.2l-0.8,2.5 c0,0,2,3,5.2,2.8s5.5,1.2,5.5,1.2l3.8,4.8c0,0,10.8,2.5,7.5,7.8s-7.2,5-7.2,5l-4.5-0.5c0,0-4.5,3-3.2,5.5s6.2,7.2,6.2,7.2 s-2,4.5,0.5,6.8s6.2,5.2,6.2,5.2s-1.5,4,3.2,4.5s10.5,2.8,10.5,2.8s1.2,3.5,6.5,1.5s9.8-3.5,9.8-3.5s8-1.5,5.2,4s-3.8,9-3.8,9 s2.5,5.8,6.2,6.5s9.5,0.8,9.5,0.8l5.5-1.1c0,0,6.5-0.2,6.2,2.8s-1.8,5.5-1.8,5.5l3.2,3.2c0,0,0.8,5.5,3.8,4.5s5.5-3.5,5.5-3.5 l3.5-1.5l4.5,1l6.5-3.5c0,0,4.2-3.2,5.2-0.8s-0.2,6.2-0.2,6.2l4.8,1.5c0,0,3.5-2.5,5.2,0.5s1.2,5,1.2,5l-4.2,9.8c0,0,2.5,8,7.8,4.8 s7-6.5,7-6.5l5-2.2l4.8,0.5l3.5-3.5l2-4.5l-3.2-2.5l-1.5-5.2l-1.2-4.2l-3.5-3.5l-2.2-3l0.5-3.5l1.2-2.5l-1.2-1.5l-0.8-3.8 L170.8,318.5z" 
                  fill="#e1f5fe" 
                  stroke="#0277bd" 
                  strokeWidth="1" 
                  className="south-america"
                />
                <path 
                  d="M450,90c0,0-4-2.2-6-0.5s-0.8,4.2-0.8,4.2s-4.5,0.8-3.8,5.2s0.5,7.2,0.5,7.2s-5.8,2.5-4.8,6s3.5,5.5,3.5,5.5 s-6.8,2.5-5.5,6.2s5.5,6.5,5.5,6.5s-1.8,2.5,0.5,3.8s6.2,1.8,6.2,1.8l3,3c0,0,6.2,4,9,1.2s2-6.2,2-6.2l3.5-1.2l4.2,2.2l1.8,3 c0,0,0.5,8.5,3.8,5.5s5-8.8,5-8.8s2.8,0.2,4-2.5s0.8-10,0.8-10s3.8-4,1.2-8s-6-4-6-4v-8l10.5-0.5c0,0,10.5-2.8,5.2-7.5 s-11.8-3.8-11.8-3.8l-5.8-4.5l1.8-4.5c0,0,11.2-1,7.5-6.5s-12.8-6-12.8-6l-8.8,0.2l-7.2-5.5H450V90z" 
                  fill="#e1f5fe" 
                  stroke="#0277bd" 
                  strokeWidth="1" 
                  className="europe"
                />
                <path 
                  d="M514.5,165.2c0,0-6.5-6.8-9.8-3.2s-2,8.2-2,8.2l-8.2,1.2c0,0-9.5-1.5-8,6.2s6.5,11.2,6.5,11.2s-3.2,6.2,0.5,9 s9.2,3.8,9.2,3.8l11.8-1l7.8,7.8c0,0,9.8,1.8,11.8-3.8s0.2-9.8,0.2-9.8s5.8-2.8,2.8-7.5s-5.8-5.8-5.8-5.8s6.5-8.5,1.8-11.8 s-10.8-2.5-10.8-2.5L514.5,165.2z" 
                  fill="#e1f5fe" 
                  stroke="#0277bd" 
                  strokeWidth="1" 
                  className="middle-east"
                />
                <path 
                  d="M540.5,217.5c0,0-8-8.8-14-3.8s-8.2,9.5-8.2,9.5l-9,0.8l-7.2-6.2l-8.8-0.8l-8.2,4.8l-4.2,6.5l-3.5,9l3.5,5.5 c0,0-1.2,7.2,2.8,8.5s9.2,0.2,9.2,0.2s2,9.5,8.2,4.5s6.8-10.2,6.8-10.2l5.5,0.2l4.5,7.2l7.2,6.8l7.2,1.5c0,0,4,9.8,10.5,4 s9.5-8,9.5-8l7-1.2c0,0,10.5-7.5,4.2-12s-13.5-5.5-13.5-5.5l-2.2-4l1.5-3.5l-3.8-6.5L540.5,217.5z" 
                  fill="#e1f5fe" 
                  stroke="#0277bd" 
                  strokeWidth="1" 
                  className="africa"
                />
                <path 
                  d="M700.2,202.5c0,0-5.8-9-12-4.5s-9.5,9.8-9.5,9.8s-10.8,1.5-7.5,10s8.8,9.8,8.8,9.8s-5.5,5.8-0.8,10.2 s11.5,5.8,11.5,5.8s-1.5,8.5,5.5,8.5s13-2.5,13-2.5s2.5,7.2,9.2,3s10.2-7.5,10.2-7.5s7.5-1.5,3.8-6.5s-8.8-9.2-8.8-9.2s6.2-6,0.8-11 s-12-3.5-12-3.5s1.5-7.5-4.5-9s-14.2-1-14.2-1L700.2,202.5z" 
                  fill="#e1f5fe" 
                  stroke="#0277bd" 
                  strokeWidth="1" 
                  className="asia"
                />
                <path 
                  d="M685,316.5c0,0-8.8-7.2-15.2-2.5s-8.5,11.5-8.5,11.5l-8.8,2.2l-8.5-5.8l-10.2,1.8l-7.5,5.8l-4.5,8 c0,0-2.5,7.2,2.8,10.2s9.2,3.5,9.2,3.5s1.8,10.2,9.5,6s8.5-10.2,8.5-10.2l5.5,1l5.8,7.8l7.5,4.8l8.2,0.5c0,0,6,10.2,12.5,3.5 s8.5-12.2,8.5-12.2c0,0,6.8-3,8.8-0.2s3.2,11.8,3.2,11.8s8,5.8,11.8,0.2s3.8-10.5,3.8-10.5l7-6.5l6.2-1.5l6.8-8.8l-1.5-13.8 l-8.5-1.5c0,0-11-6.8-16.2-1.5s-7.2,10.8-7.2,10.8l-9.2,0.8c0,0-10.5-6.8-15-1.8S685,316.5,685,316.5z" 
                  fill="#e1f5fe" 
                  stroke="#0277bd" 
                  strokeWidth="1" 
                  className="australia"
                />
              </g>
              
              {/* Impact Markers */}
              <g className="impact-markers">
                <g className="marker north-america" transform="translate(120, 150)">
                  <circle cx="0" cy="0" r="6" fill="#4CAF50" />
                  <line x1="0" y1="0" x2="0" y2="-25" stroke="#4CAF50" strokeWidth="1.5" />
                  <rect x="-35" y="-45" width="70" height="18" rx="5" fill="white" stroke="#4CAF50" strokeWidth="1" />
                  <text x="0" y="-32" textAnchor="middle" fontSize="10" fill="#1B5E20" fontWeight="bold">76% donations</text>
                </g>
                
                <g className="marker europe" transform="translate(450, 110)">
                  <circle cx="0" cy="0" r="6" fill="#2196F3" />
                  <line x1="0" y1="0" x2="0" y2="-25" stroke="#2196F3" strokeWidth="1.5" />
                  <rect x="-35" y="-45" width="70" height="18" rx="5" fill="white" stroke="#2196F3" strokeWidth="1" />
                  <text x="0" y="-32" textAnchor="middle" fontSize="10" fill="#0D47A1" fontWeight="bold">15% donations</text>
                </g>
                
                <g className="marker africa" transform="translate(520, 230)">
                  <circle cx="0" cy="0" r="6" fill="#FFC107" />
                  <line x1="0" y1="0" x2="0" y2="-25" stroke="#FFC107" strokeWidth="1.5" />
                  <rect x="-35" y="-45" width="70" height="18" rx="5" fill="white" stroke="#FFC107" strokeWidth="1" />
                  <text x="0" y="-32" textAnchor="middle" fontSize="10" fill="#FF6F00" fontWeight="bold">9% waste</text>
                </g>
              </g>
              
              <style>
                {`
                .world-map {
                  animation: fadeIn 1s ease-in-out;
                }
                .map-base path {
                  transition: fill 0.3s;
                }
                .map-base path:hover {
                  fill: #b3e5fc;
                  cursor: pointer;
                }
                .marker {
                  animation: pulseMarker 2s infinite;
                }
                @keyframes pulseMarker {
                  0% { transform: scale(1); }
                  50% { transform: scale(1.1); }
                  100% { transform: scale(1); }
                }
                @keyframes fadeIn {
                  from { opacity: 0; }
                  to { opacity: 1; }
                }
                `}
              </style>
            </svg>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/30 pointer-events-none z-20"></div>
        </div>
        
        <div className="space-y-2 mt-3 animate-fade-in">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
              <span>Food Banks (4)</span>
            </div>
            <span className="text-green-600 font-medium">76% donations</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
              <span>Shelters (2)</span>
            </div>
            <span className="text-blue-600 font-medium">15% donations</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
              <span>Composting (3)</span>
            </div>
            <span className="text-amber-600 font-medium">9% waste</span>
          </div>
        </div>
        
        <button className="w-full mt-4 text-sm flex items-center justify-center text-blue-600 hover:text-blue-800 font-medium transform hover:scale-105 transition-all">
          View detailed impact report
          <ExternalLink className="h-3 w-3 ml-1" />
        </button>
      </CardContent>
    </Card>
  );
};

export default TopGeographies;
