
import React, { useState } from 'react';
import { Bell, CheckCircle, X, MessageSquare, PackageOpen, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
};

const notifications: Notification[] = [
  {
    id: '1',
    title: 'Donation Received',
    message: 'Fresh Eats Co. has picked up your donation of 25kg produce.',
    time: '2 hours ago',
    read: false,
    type: 'success'
  },
  {
    id: '2',
    title: 'Waste Alert',
    message: 'Unusual amount of dairy waste detected today. Consider adjusting inventory.',
    time: '5 hours ago',
    read: false,
    type: 'warning'
  },
  {
    id: '3',
    title: 'Tax Report Ready',
    message: 'Your monthly donation tax report is ready for review and download.',
    time: 'Yesterday',
    read: true,
    type: 'info'
  },
  {
    id: '4',
    title: 'New Feature Available',
    message: 'Check out our new AI prediction tools to better forecast inventory needs.',
    time: '3 days ago',
    read: true,
    type: 'info'
  }
];

const getNotificationIcon = (type: Notification['type']) => {
  switch(type) {
    case 'success':
      return <PackageOpen className="h-5 w-5 text-green-500" />;
    case 'warning':
      return <MessageSquare className="h-5 w-5 text-amber-500" />;
    case 'error':
      return <X className="h-5 w-5 text-red-500" />;
    case 'info':
    default:
      return <FileCheck className="h-5 w-5 text-blue-500" />;
  }
};

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const [notificationList, setNotificationList] = useState<Notification[]>(notifications);
  
  const unreadCount = notificationList.filter(n => !n.read).length;
  
  const markAllAsRead = () => {
    setNotificationList(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };
  
  const markAsRead = (id: string) => {
    setNotificationList(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };
  
  const deleteNotification = (id: string) => {
    setNotificationList(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };

  if (!isOpen) return null;
  
  return (
    <>
      {/* Backdrop to prevent clicking through and to separate from background */}
      <div 
        className="fixed inset-0 bg-black/5 z-[90]" 
        onClick={onClose}
      />
      
      <Card className="absolute top-14 right-2 w-80 shadow-xl z-[100] p-0 overflow-hidden max-h-[80vh] flex flex-col border-2 border-wastewise-light-green/20 bg-white animate-fade-in">
        <div className="p-4 border-b flex items-center justify-between bg-wastewise-light-beige">
          <div>
            <h3 className="font-medium text-lg">Notifications</h3>
            <p className="text-sm text-wastewise-gray">{unreadCount} unread</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-wastewise-gray hover:text-wastewise-dark-green"
            onClick={markAllAsRead}
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            <span className="text-xs">Mark all read</span>
          </Button>
        </div>
        
        <div className="overflow-y-auto flex-1 bg-white">
          {notificationList.length > 0 ? (
            <div className="divide-y">
              {notificationList.map((notification) => (
                <div 
                  key={notification.id}
                  className={cn(
                    "p-4 hover:bg-wastewise-light-beige/50 transition-colors relative",
                    !notification.read && "bg-wastewise-light-beige/30"
                  )}
                >
                  <div className="flex">
                    <div className="mr-3 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <span className="text-xs text-wastewise-gray">{notification.time}</span>
                      </div>
                      <p className="text-sm text-wastewise-gray mt-1">{notification.message}</p>
                      <div className="flex justify-end mt-2">
                        {!notification.read && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 text-xs text-wastewise-green hover:text-wastewise-dark-green"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as read
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 text-xs text-wastewise-gray hover:text-red-500"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-wastewise-gray">
              <p>No notifications</p>
            </div>
          )}
        </div>
        
        <div className="p-3 border-t">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full text-wastewise-gray hover:text-wastewise-dark-green"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </Card>
    </>
  );
};

export default NotificationPanel;
