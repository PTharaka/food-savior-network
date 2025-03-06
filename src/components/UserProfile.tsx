
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
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
    }, 800);
  };

  return (
    <div className="glass-panel p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-wastewise-dark-green">Business Profile</h2>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} variant="outline">
            Edit Profile
          </Button>
        ) : (
          <Button onClick={() => setIsEditing(false)} variant="outline">
            Cancel
          </Button>
        )}
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="bg-wastewise-green/20 h-16 w-16 rounded-full flex items-center justify-center text-2xl font-bold text-wastewise-green">
          {formData.businessName.charAt(0)}
        </div>
        <div>
          <h3 className="text-xl font-semibold">{formData.businessName}</h3>
          <div className="flex gap-2 mt-1">
            <Badge variant="secondary">Restaurant</Badge>
            <Badge variant="outline">Premium Plan</Badge>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPerson">Primary Contact</Label>
              <Input
                id="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Business Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          <Separator className="my-6" />

          <h3 className="text-xl font-semibold mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base" htmlFor="notificationsEmail">Email Notifications</Label>
                <p className="text-sm text-wastewise-gray">Receive updates about donations and reports</p>
              </div>
              <Switch
                id="notificationsEmail"
                checked={formData.notificationsEmail}
                onCheckedChange={() => handleToggle('notificationsEmail')}
                disabled={!isEditing}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base" htmlFor="notificationsSMS">SMS Notifications</Label>
                <p className="text-sm text-wastewise-gray">Get text alerts for urgent donations</p>
              </div>
              <Switch
                id="notificationsSMS"
                checked={formData.notificationsSMS}
                onCheckedChange={() => handleToggle('notificationsSMS')}
                disabled={!isEditing}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base" htmlFor="notificationsApp">In-App Notifications</Label>
                <p className="text-sm text-wastewise-gray">Receive alerts while using the app</p>
              </div>
              <Switch
                id="notificationsApp"
                checked={formData.notificationsApp}
                onCheckedChange={() => handleToggle('notificationsApp')}
                disabled={!isEditing}
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end mt-6">
              <Button type="submit" className="bg-wastewise-green hover:bg-wastewise-dark-green">
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
