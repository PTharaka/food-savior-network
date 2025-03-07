
import { toast } from "sonner";

type NotificationType = 'email' | 'sms' | 'push';

interface NotificationOptions {
  type: NotificationType;
  recipients: string[];
  subject?: string;
  template?: string;
  data?: Record<string, any>;
}

interface NotificationResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

class NotificationService {
  private static instance: NotificationService;

  private constructor() {}

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  public async sendNotification(options: NotificationOptions): Promise<NotificationResult> {
    // For demo purposes, we'll simulate sending notifications
    console.log('Sending notification:', options);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real implementation, we would integrate with services like:
    // - SendGrid for email
    // - Twilio for SMS
    // - Firebase Cloud Messaging for push notifications

    const success = Math.random() > 0.1; // 90% success rate for demo
    
    if (success) {
      const messageId = `msg_${Date.now()}`;
      return { success: true, messageId };
    } else {
      return { 
        success: false, 
        error: 'Failed to send notification. Please try again later.' 
      };
    }
  }

  public async sendDonationAlert(
    organizationEmail: string,
    organizationPhone: string,
    donationDetails: {
      businessName: string;
      items: string;
      quantity: string;
      pickupDate: string;
      address: string;
      contactPerson?: string;
      contactPhone?: string;
    }
  ): Promise<NotificationResult> {
    const emailTemplate = `
      New donation available from ${donationDetails.businessName}
      
      Items: ${donationDetails.items}
      Quantity: ${donationDetails.quantity}
      Pickup Date: ${donationDetails.pickupDate}
      Pickup Address: ${donationDetails.address}
      
      Please respond to confirm pickup.
    `;
    
    const smsTemplate = `
      New donation from ${donationDetails.businessName}: ${donationDetails.items} (${donationDetails.quantity}) available for pickup on ${donationDetails.pickupDate}. Reply YES to confirm.
    `;
    
    try {
      // Send email notification
      const emailResult = await this.sendNotification({
        type: 'email',
        recipients: [organizationEmail],
        subject: 'New Donation Available',
        template: 'donation_alert',
        data: donationDetails
      });
      
      // For demo, we'll show a toast for the email
      toast.success(`Email notification sent to ${organizationEmail}`);
      
      // Send SMS notification if phone is provided
      if (organizationPhone) {
        const smsResult = await this.sendNotification({
          type: 'sms',
          recipients: [organizationPhone],
          data: { message: smsTemplate }
        });
        
        toast.success(`SMS notification sent to ${organizationPhone}`);
      }
      
      return { success: true, messageId: `msg_${Date.now()}` };
    } catch (error) {
      console.error('Error sending donation alert:', error);
      return { success: false, error: 'Failed to send notifications' };
    }
  }

  public async sendWasteAlertToManagement(
    wasteData: {
      itemName: string;
      quantity: number;
      reason: string;
      value: number;
      date: string;
    }
  ): Promise<NotificationResult> {
    const template = `
      Waste Alert: High-value waste detected
      
      Item: ${wasteData.itemName}
      Quantity: ${wasteData.quantity}
      Reason: ${wasteData.reason}
      Estimated Value: $${wasteData.value.toFixed(2)}
      Date: ${wasteData.date}
      
      This waste item exceeds your alert threshold. Please review your inventory management procedures.
    `;
    
    try {
      // In a real app, this would send to management emails
      const result = await this.sendNotification({
        type: 'email',
        recipients: ['management@example.com'],
        subject: 'High-Value Waste Alert',
        template: 'waste_alert',
        data: wasteData
      });
      
      toast.success('Management alert sent for high-value waste');
      return result;
    } catch (error) {
      console.error('Error sending waste alert:', error);
      return { success: false, error: 'Failed to send waste alert' };
    }
  }
}

export default NotificationService;
