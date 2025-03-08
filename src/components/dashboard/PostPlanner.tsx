
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const PostPlanner: React.FC = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const calendarDays = daysOfWeek.map((day, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - today.getDay() + index);
    return {
      day,
      date: date.getDate().toString().padStart(2, '0')
    };
  });

  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">My post planner</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 text-center">
          {calendarDays.map((item, index) => (
            <div key={index} className={`${index === 0 ? 'bg-gray-100 rounded-md' : ''} p-2`}>
              <div className="text-xs text-gray-500">{item.day}</div>
              <div className={`text-sm font-medium ${index === 0 ? 'text-gray-800' : 'text-gray-600'}`}>
                {item.date}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PostPlanner;
