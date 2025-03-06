
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Send, Clock, Plus, Calendar } from 'lucide-react';
import { toast } from "sonner";
import DonationAlertService from '@/services/DonationAlertService';

type Donation = {
  id: string;
  organization: string;
  items: string;
  quantity: string;
  status: 'pending' | 'scheduled' | 'completed' | 'cancelled';
  date: string;
  address: string;
  estimatedValue?: number;
};

const DonationManager: React.FC = () => {
  const [donations, setDonations] = useState<Donation[]>([
    {
      id: '1',
      organization: 'City Food Bank',
      items: 'Bread, Vegetables',
      quantity: '10 kg',
      status: 'scheduled',
      date: '2023-11-10',
      address: '123 Main St, City',
      estimatedValue: 45.50
    },
    {
      id: '2',
      organization: 'Shelter Kitchen',
      items: 'Dairy Products',
      quantity: '5 kg',
      status: 'pending',
      date: '2023-11-12',
      address: '456 Oak Ave, City',
      estimatedValue: 32.75
    },
    {
      id: '3',
      organization: 'Community Pantry',
      items: 'Canned Goods',
      quantity: '15 kg',
      status: 'completed',
      date: '2023-11-01',
      address: '789 Pine Rd, City',
      estimatedValue: 60.25
    },
  ]);
  const [activeAlerts, setActiveAlerts] = useState<any[]>([]);
  const [nearbyOrganizations, setNearbyOrganizations] = useState<any[]>([]);
  const [showNewDonationDialog, setShowNewDonationDialog] = useState(false);
  const [newDonation, setNewDonation] = useState<Partial<Donation>>({
    organization: '',
    items: '',
    quantity: '',
    date: new Date().toISOString().split('T')[0],
    status: 'pending'
  });
  const [loading, setLoading] = useState(false);
  
  const donationService = DonationAlertService.getInstance();

  useEffect(() => {
    // Load donation alerts and nearby organizations
    loadAlerts();
    loadNearbyOrganizations();
  }, []);

  const loadAlerts = () => {
    const alerts = donationService.getActiveAlerts();
    setActiveAlerts(alerts);
  };

  const loadNearbyOrganizations = () => {
    const orgs = donationService.getNearbyOrganizations();
    setNearbyOrganizations(orgs);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewDonation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewDonation(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'organization') {
      // Find the selected organization and set its address
      const selectedOrg = nearbyOrganizations.find(org => org.name === value);
      if (selectedOrg) {
        setNewDonation(prev => ({
          ...prev,
          address: selectedOrg.address
        }));
      }
    }
  };

  const handleCreateDonation = async () => {
    if (!newDonation.organization || !newDonation.items || !newDonation.quantity || !newDonation.date) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const createdDonation: Donation = {
        id: `donation_${Date.now()}`,
        organization: newDonation.organization || '',
        items: newDonation.items || '',
        quantity: newDonation.quantity || '',
        status: 'pending',
        date: newDonation.date || new Date().toISOString().split('T')[0],
        address: newDonation.address || '',
        estimatedValue: Math.round(Math.random() * 10000) / 100 // Random value for demo
      };
      
      setDonations(prev => [createdDonation, ...prev]);
      setShowNewDonationDialog(false);
      setNewDonation({
        organization: '',
        items: '',
        quantity: '',
        date: new Date().toISOString().split('T')[0],
        status: 'pending'
      });
      
      toast.success('Donation created successfully');
    } catch (error) {
      console.error('Error creating donation:', error);
      toast.error('Failed to create donation');
    } finally {
      setLoading(false);
    }
  };

  const handleSendNotification = async (donationId: string) => {
    setLoading(true);
    try {
      // Find the donation
      const donation = donations.find(d => d.id === donationId);
      if (!donation) {
        throw new Error('Donation not found');
      }
      
      // Simulate sending notification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update donation status
      setDonations(prev => prev.map(d => 
        d.id === donationId ? { ...d, status: 'scheduled' } : d
      ));
      
      toast.success(`Notification sent to ${donation.organization}`);
    } catch (error) {
      console.error('Error sending notification:', error);
      toast.error('Failed to send notification');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteDonation = async (donationId: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update donation status
      setDonations(prev => prev.map(d => 
        d.id === donationId ? { ...d, status: 'completed' } : d
      ));
      
      toast.success('Donation marked as completed');
    } catch (error) {
      console.error('Error completing donation:', error);
      toast.error('Failed to complete donation');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptAlert = async (alertId: string) => {
    setLoading(true);
    try {
      // Get the alert
      const alert = activeAlerts.find(a => a.id === alertId);
      if (!alert) {
        throw new Error('Alert not found');
      }
      
      // Update alert status
      await donationService.updateAlertStatus(alertId, 'accepted');
      
      // Create a donation from this alert
      const newDonationFromAlert: Donation = {
        id: `donation_${Date.now()}`,
        organization: alert.suggestedOrganizations[0]?.name || 'Not specified',
        items: alert.itemName,
        quantity: `${alert.quantity} units`,
        status: 'pending',
        date: alert.expiryDate,
        address: alert.suggestedOrganizations[0]?.address || 'Not specified',
        estimatedValue: Math.round(Math.random() * 10000) / 100 // Random value for demo
      };
      
      setDonations(prev => [newDonationFromAlert, ...prev]);
      
      // Refresh alerts
      loadAlerts();
      
      toast.success('Alert accepted and donation created');
    } catch (error) {
      console.error('Error accepting alert:', error);
      toast.error('Failed to accept alert');
    } finally {
      setLoading(false);
    }
  };

  const handleDeclineAlert = async (alertId: string) => {
    setLoading(true);
    try {
      // Update alert status
      await donationService.updateAlertStatus(alertId, 'declined');
      
      // Refresh alerts
      loadAlerts();
      
      toast.success('Alert declined');
    } catch (error) {
      console.error('Error declining alert:', error);
      toast.error('Failed to decline alert');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-wastewise-dark-gray">Donation Manager</h2>
        <Dialog open={showNewDonationDialog} onOpenChange={setShowNewDonationDialog}>
          <DialogTrigger asChild>
            <Button className="bg-wastewise-green text-white hover:bg-wastewise-dark-green">
              <Plus size={16} className="mr-2" /> New Donation
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Donation</DialogTitle>
              <DialogDescription>
                Fill in the details below to schedule a new donation.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="organization">Recipient Organization</Label>
                <Select 
                  value={newDonation.organization} 
                  onValueChange={(value) => handleSelectChange('organization', value)}
                >
                  <SelectTrigger id="organization">
                    <SelectValue placeholder="Select an organization" />
                  </SelectTrigger>
                  <SelectContent>
                    {nearbyOrganizations.map((org) => (
                      <SelectItem key={org.id} value={org.name}>
                        {org.name} ({org.distance.toFixed(1)} miles)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="items">Items to Donate</Label>
                <Textarea 
                  id="items" 
                  name="items"
                  placeholder="Describe the items you're donating"
                  value={newDonation.items}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input 
                  id="quantity" 
                  name="quantity"
                  placeholder="e.g., 10 kg, 5 boxes"
                  value={newDonation.quantity}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Pickup/Delivery Date</Label>
                <Input 
                  id="date" 
                  name="date"
                  type="date" 
                  value={newDonation.date}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewDonationDialog(false)}>Cancel</Button>
              <Button 
                className="bg-wastewise-green text-white hover:bg-wastewise-dark-green"
                onClick={handleCreateDonation}
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Donation'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {activeAlerts.length > 0 && (
        <Card className="border-wastewise-green bg-wastewise-green/5">
          <CardHeader>
            <CardTitle className="text-wastewise-dark-green">Donation Alerts</CardTitle>
            <CardDescription>
              AI-generated alerts for items that should be donated soon to prevent waste
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeAlerts.map((alert) => (
                <div key={alert.id} className="border border-wastewise-light-gray bg-white rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-wastewise-dark-gray">{alert.itemName}</h3>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Alert
                      </Badge>
                    </div>
                    <p className="text-sm text-wastewise-gray">Quantity: {alert.quantity}</p>
                    <div className="flex items-center gap-2 text-sm text-wastewise-gray">
                      <Calendar size={14} /> Expires: {alert.expiryDate}
                    </div>
                    <p className="text-sm text-wastewise-gray">
                      Suggested Recipients: {alert.suggestedOrganizations.map((org: any) => org.name).join(', ')}
                    </p>
                  </div>
                  <div className="flex flex-row sm:flex-col gap-2 self-end sm:self-center">
                    <Button 
                      size="sm" 
                      className="bg-wastewise-green text-white hover:bg-wastewise-dark-green"
                      onClick={() => handleAcceptAlert(alert.id)}
                      disabled={loading}
                    >
                      Accept
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeclineAlert(alert.id)}
                      disabled={loading}
                    >
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Recent Donations</CardTitle>
          <CardDescription>Manage your food donations to local organizations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {donations.map((donation) => (
              <div key={donation.id} className="border border-wastewise-light-gray rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-wastewise-dark-gray">{donation.organization}</h3>
                    <Badge variant={
                      donation.status === 'completed' ? 'default' :
                      donation.status === 'scheduled' ? 'outline' :
                      donation.status === 'pending' ? 'secondary' : 'destructive'
                    }>
                      {donation.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-wastewise-gray">Items: {donation.items}</p>
                  <p className="text-sm text-wastewise-gray">Quantity: {donation.quantity}</p>
                  <div className="flex items-center gap-2 text-sm text-wastewise-gray">
                    <Clock size={14} /> {donation.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-wastewise-gray">
                    <MapPin size={14} /> {donation.address}
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col gap-2 self-end sm:self-center">
                  <Button variant="outline" size="sm" className="whitespace-nowrap">
                    View Details
                  </Button>
                  {donation.status === 'pending' && (
                    <Button 
                      size="sm" 
                      className="bg-wastewise-green text-white hover:bg-wastewise-dark-green whitespace-nowrap"
                      onClick={() => handleSendNotification(donation.id)}
                      disabled={loading}
                    >
                      <Send size={14} className="mr-2" /> Send Notification
                    </Button>
                  )}
                  {donation.status === 'scheduled' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-wastewise-green text-wastewise-green whitespace-nowrap"
                      onClick={() => handleCompleteDonation(donation.id)}
                      disabled={loading}
                    >
                      Mark Completed
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Nearby Organizations</CardTitle>
          <CardDescription>Food banks and charities in your area</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {nearbyOrganizations.map((org) => (
              <div key={org.id} className="border border-wastewise-light-gray rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-wastewise-dark-gray">{org.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-wastewise-gray mt-1">
                      <MapPin size={14} /> {org.address} ({org.distance.toFixed(1)} miles away)
                    </div>
                    <p className="text-sm text-wastewise-gray mt-2">Contact: {org.contactPerson}, {org.phone}</p>
                    <div className="mt-2">
                      <span className="text-xs font-medium">Accepts: </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {org.acceptedItems.map((item: string, i: number) => (
                          <Badge key={i} variant="outline" className="bg-wastewise-light-gray/20">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-wastewise-green border-wastewise-green"
                    onClick={() => {
                      setNewDonation(prev => ({
                        ...prev,
                        organization: org.name,
                        address: org.address
                      }));
                      setShowNewDonationDialog(true);
                    }}
                  >
                    Donate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationManager;
