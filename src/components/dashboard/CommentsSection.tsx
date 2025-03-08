
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const CommentsSection: React.FC = () => {
  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Comments and mentions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md p-3 flex mb-2">
          <div className="h-10 w-10 rounded-full bg-gray-200 mr-3 flex-shrink-0">
            <img 
              src="https://ui-avatars.com/api/?name=User&background=random" 
              alt="User" 
              className="h-10 w-10 rounded-full"
            />
          </div>
          <div>
            <div className="flex items-center">
              <span className="font-medium mr-1">Monu X</span>
              <span className="text-xs text-gray-500">@monu_icons</span>
            </div>
            <div className="text-sm text-gray-500">Sylhet, Bangladesh</div>
            <div className="text-xs text-gray-400 mt-1">31 Jan 12:30 AM</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentsSection;
