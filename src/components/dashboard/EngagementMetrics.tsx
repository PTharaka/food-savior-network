
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trophy, Medal, UserCheck } from 'lucide-react';

const EngagementMetrics: React.FC = () => {
  const employees = [
    { id: 1, name: "Alex Johnson", position: "Kitchen Manager", score: 95, badges: 4 },
    { id: 2, name: "Maria Garcia", position: "Inventory Specialist", score: 87, badges: 3 },
    { id: 3, name: "David Kim", position: "Sous Chef", score: 76, badges: 2 }
  ];

  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-amber-500" />
          Employee Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {employees.map((employee, idx) => (
            <div key={employee.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md">
              <div className={`h-7 w-7 rounded-full flex items-center justify-center ${
                idx === 0 ? 'bg-amber-100 text-amber-600' : 
                idx === 1 ? 'bg-gray-100 text-gray-600' : 
                            'bg-amber-50 text-amber-700'
              } font-semibold`}>
                {idx + 1}
              </div>
              <div className="flex-1">
                <div className="font-medium">{employee.name}</div>
                <div className="text-xs text-gray-500">{employee.position}</div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex">
                  {Array.from({ length: employee.badges }).map((_, i) => (
                    <Medal key={i} className="h-4 w-4 text-amber-500 -ml-1" />
                  ))}
                </div>
                <div className="bg-green-50 text-green-700 font-medium px-2 py-1 rounded text-xs">
                  {employee.score}%
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <div className="text-gray-600 flex items-center">
              <UserCheck className="h-4 w-4 mr-1 text-blue-500" />
              <span>Team Engagement</span>
            </div>
            <div className="font-semibold">86% Overall</div>
          </div>
          
          <div className="mt-2 bg-gray-100 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 h-full rounded-full" style={{ width: '86%' }}></div>
          </div>
          
          <div className="mt-3 text-xs text-center text-gray-500">
            Next reward milestone: 90% team engagement
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementMetrics;
