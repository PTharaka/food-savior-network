
import { toast } from "sonner";

interface Organization {
  id: string;
  name: string;
  distance: number; // in miles
  address: string;
  contactPerson: string;
  phone: string;
  acceptedItems: string[];
  availableTimes: string[];
}

interface DonationAlert {
  id: string;
  itemName: string;
  quantity: number;
  expiryDate: string;
  suggestedOrganizations: Organization[];
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  createdAt: string;
}

class DonationAlertService {
  private static instance: DonationAlertService;
  private alerts: DonationAlert[] = [];
  private nearbyOrganizations: Organization[] = [
    {
      id: 'org_1',
      name: 'City Food Bank',
      distance: 2.3,
      address: '123 Main St, City',
      contactPerson: 'John Smith',
      phone: '(555) 123-4567',
      acceptedItems: ['Produce', 'Bakery', 'Canned Goods', 'Dairy'],
      availableTimes: ['Mon-Fri: 9am-5pm', 'Sat: 10am-2pm']
    },
    {
      id: 'org_2',
      name: 'Shelter Kitchen',
      distance: 3.7,
      address: '456 Oak Ave, City',
      contactPerson: 'Mary Johnson',
      phone: '(555) 987-6543',
      acceptedItems: ['Meat', 'Dairy', 'Produce'],
      availableTimes: ['Mon-Sun: 8am-8pm']
    },
    {
      id: 'org_3',
      name: 'Community Pantry',
      distance: 1.5,
      address: '789 Pine Rd, City',
      contactPerson: 'David Williams',
      phone: '(555) 456-7890',
      acceptedItems: ['Canned Goods', 'Dry Goods', 'Bakery'],
      availableTimes: ['Tue-Thu: 10am-4pm']
    }
  ];

  private constructor() {}

  public static getInstance(): DonationAlertService {
    if (!DonationAlertService.instance) {
      DonationAlertService.instance = new DonationAlertService();
    }
    return DonationAlertService.instance;
  }

  getNearbyOrganizations(): Organization[] {
    return this.nearbyOrganizations;
  }

  createDonationAlert(itemName: string, quantity: number, expiryDate: string): Promise<DonationAlert> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Find organizations that accept this type of item
        // In a real app, this would use item categories and organization preferences
        const suggestedOrgs = this.nearbyOrganizations
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 2);
        
        const newAlert: DonationAlert = {
          id: `alert_${Date.now()}`,
          itemName,
          quantity,
          expiryDate,
          suggestedOrganizations: suggestedOrgs,
          status: 'pending',
          createdAt: new Date().toISOString()
        };
        
        this.alerts.push(newAlert);
        console.log('Created donation alert', newAlert);
        toast.success('Donation alert created');
        resolve(newAlert);
      }, 1000);
    });
  }

  getActiveAlerts(): DonationAlert[] {
    return this.alerts.filter(alert => alert.status !== 'completed' && alert.status !== 'declined');
  }

  updateAlertStatus(alertId: string, status: 'pending' | 'accepted' | 'declined' | 'completed'): Promise<DonationAlert> {
    return new Promise((resolve, reject) => {
      const alertIndex = this.alerts.findIndex(a => a.id === alertId);
      if (alertIndex === -1) {
        reject(new Error('Alert not found'));
        return;
      }
      
      setTimeout(() => {
        this.alerts[alertIndex].status = status;
        console.log(`Updated alert ${alertId} status to ${status}`);
        toast.success(`Donation alert updated`);
        resolve(this.alerts[alertIndex]);
      }, 1000);
    });
  }

  sendNotificationToOrganization(alertId: string, organizationId: string): Promise<boolean> {
    // In a real app, this would send an email, SMS, or app notification
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Notification sent to organization ${organizationId} for alert ${alertId}`);
        toast.success('Notification sent to organization');
        resolve(true);
      }, 1500);
    });
  }
}

export default DonationAlertService;
