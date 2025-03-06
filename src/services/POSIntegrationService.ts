
import { toast } from "sonner";

type POSProvider = 'square' | 'toast' | 'lightspeed' | 'clover' | 'shopify';

interface POSConnectionConfig {
  provider: POSProvider;
  apiKey: string;
  storeId?: string;
  syncFrequency?: 'realtime' | 'hourly' | 'daily';
}

class POSIntegrationService {
  private static instance: POSIntegrationService;
  private connections: Map<string, POSConnectionConfig> = new Map();
  private isConnected: boolean = false;

  private constructor() {}

  public static getInstance(): POSIntegrationService {
    if (!POSIntegrationService.instance) {
      POSIntegrationService.instance = new POSIntegrationService();
    }
    return POSIntegrationService.instance;
  }

  connectToPOS(config: POSConnectionConfig): Promise<boolean> {
    // In a real implementation, this would authenticate with the POS API
    return new Promise((resolve) => {
      setTimeout(() => {
        this.connections.set(config.provider, config);
        this.isConnected = true;
        console.log(`Connected to ${config.provider} POS system`);
        toast.success(`Connected to ${config.provider} POS system`);
        resolve(true);
      }, 1500);
    });
  }

  disconnectFromPOS(provider: POSProvider): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.connections.delete(provider);
        this.isConnected = this.connections.size > 0;
        console.log(`Disconnected from ${provider} POS system`);
        toast.success(`Disconnected from ${provider} POS system`);
        resolve(true);
      }, 1000);
    });
  }

  syncInventory(): Promise<any[]> {
    // Mock implementation - would actually pull data from the POS system
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockInventory = [
          { id: 'prod_1', name: 'Organic Lettuce', quantity: 15, expiryDate: '2023-11-10', category: 'Produce' },
          { id: 'prod_2', name: 'Artisan Bread', quantity: 8, expiryDate: '2023-11-08', category: 'Bakery' },
          { id: 'prod_3', name: 'Fresh Milk', quantity: 12, expiryDate: '2023-11-12', category: 'Dairy' },
          { id: 'prod_4', name: 'Chicken Breast', quantity: 5, expiryDate: '2023-11-09', category: 'Meat' },
        ];
        console.log('Synced inventory from POS system', mockInventory);
        toast.success('Inventory synced from POS system');
        resolve(mockInventory);
      }, 2000);
    });
  }

  isConnectedToPOS(): boolean {
    return this.isConnected;
  }

  getConnectedSystems(): POSConnectionConfig[] {
    return Array.from(this.connections.values());
  }
}

export default POSIntegrationService;
