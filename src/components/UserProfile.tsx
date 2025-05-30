
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { X, ArrowLeft } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface UserProfileProps {
  isModal?: boolean;
  onClose?: () => void;
}

const UserProfile = ({ isModal, onClose }: UserProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({
    businessName: "Green Leaf Restaurant",
    email: "contact@greenleaf.com",
    phone: "+1 (555) 123-4567",
    address: "123 Sustainable St, Eco City, EC 12345",
    contactPerson: "Alex Johnson",
    notificationsEmail: true,
    notificationsSMS: false,
    notificationsApp: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleToggle = (id: string) => {
    setFormData(prev => ({ ...prev, [id]: !prev[id as keyof typeof prev] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call to update profile
    setTimeout(() => {
      toast.success("Profile updated successfully");
      setIsEditing(false);
      if (onClose) {
        setTimeout(onClose, 1000);
      }
    }, 800);
  };

  return (
    <div className={`
      ${isModal ? "p-3 sm:p-4" : "glass-panel p-4 sm:p-6 lg:p-8 w-full max-w-5xl mx-auto"} 
      bg-white rounded-lg shadow-sm border border-wastewise-light-gray/20
    `}>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          {onClose && !isMobile && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose} 
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Button>
          )}
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-wastewise-dark-green">
            Business Profile
          </h2>
        </div>
        
        <div className="flex gap-2 self-start sm:self-auto">
          {!isEditing ? (
            <Button 
              onClick={() => setIsEditing(true)} 
              variant="outline" 
              size={isMobile ? "sm" : "default"}
              className="text-xs sm:text-sm"
            >
              Edit Profile
            </Button>
          ) : (
            <Button 
              onClick={() => setIsEditing(false)} 
              variant="outline" 
              size={isMobile ? "sm" : "default"}
              className="text-xs sm:text-sm"
            >
              Cancel
            </Button>
          )}
          {isModal && onClose && (
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Profile Avatar & Info - Only show on larger screens when not modal */}
      {!isModal && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 sm:mb-6 p-4 bg-wastewise-soft-green/30 rounded-lg">
          <div className="bg-wastewise-green/20 h-12 w-12 sm:h-16 sm:w-16 rounded-full flex items-center justify-center text-lg sm:text-2xl font-bold text-wastewise-green mx-auto sm:mx-0">
            {formData.businessName.charAt(0)}
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-semibold">{formData.businessName}</h3>
            <div className="flex gap-2 mt-1 justify-center sm:justify-start flex-wrap">
              <Badge variant="secondary" className="text-xs">Restaurant</Badge>
              <Badge variant="outline" className="text-xs">Premium Plan</Badge>
            </div>
          </div>
        </div>
      )}

      <Separator className="my-4" />

      {/* Form Section */}
      <form onSubmit={handleSubmit} className={`
        ${isModal ? "max-h-[60vh] overflow-y-auto pr-2" : ""} 
        space-y-4 sm:space-y-6
      `}>
        {/* Basic Information */}
        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label htmlFor="businessName" className="text-sm font-medium">Business Name</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPerson" className="text-sm font-medium">Primary Contact</Label>
              <Input
                id="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full text-sm"
              />
            </div>
            <div className="space-y-2 lg:col-span-2">
              <Label htmlFor="address" className="text-sm font-medium">Business Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full text-sm"
              />
            </div>
          </div>
        </div>

        <Separator className="my-4 sm:my-6" />

        {/* Notification Preferences */}
        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-semibold">Notification Preferences</h3>
          <div className="space-y-4">
            {[
              {
                id: 'notificationsEmail',
                title: 'Email Notifications',
                description: 'Receive updates about donations and reports',
                checked: formData.notificationsEmail
              },
              {
                id: 'notificationsSMS',
                title: 'SMS Notifications',
                description: 'Get text alerts for urgent donations',
                checked: formData.notificationsSMS
              },
              {
                id: 'notificationsApp',
                title: 'In-App Notifications',
                description: 'Receive alerts while using the app',
                checked: formData.notificationsApp
              }
            ].map((notification) => (
              <div key={notification.id} className="flex items-start justify-between gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                <div className="flex-1 min-w-0">
                  <Label className="text-sm sm:text-base font-medium cursor-pointer" htmlFor={notification.id}>
                    {notification.title}
                  </Label>
                  <p className="text-xs sm:text-sm text-wastewise-gray mt-1 leading-relaxed">
                    {notification.description}
                  </p>
                </div>
                <Switch
                  id={notification.id}
                  checked={notification.checked}
                  onCheckedChange={() => handleToggle(notification.id)}
                  disabled={!isEditing}
                  className="flex-shrink-0"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="flex justify-end pt-4 sm:pt-6 border-t">
            <Button 
              type="submit" 
              className="bg-wastewise-green hover:bg-wastewise-dark-green text-white px-6 py-2 text-sm sm:text-base"
            >
              Save Changes
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserProfile;
