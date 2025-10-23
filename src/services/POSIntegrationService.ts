
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type POSProvider = 'square' | 'toast' | 'lightspeed' | 'clover' | 'shopify';

interface POSConnectionConfig {
  provider: POSProvider;
  apiKey: string;
  storeId?: string;
  syncFrequency?: 'realtime' | 'hourly' | 'daily';
}

interface POSConnection {
  id: string;
  provider: POSProvider;
  status: string;
  last_synced_at: string | null;
}

class POSIntegrationService {
  private static instance: POSIntegrationService;

  private constructor() {}

  public static getInstance(): POSIntegrationService {
    if (!POSIntegrationService.instance) {
      POSIntegrationService.instance = new POSIntegrationService();
    }
    return POSIntegrationService.instance;
  }

  async connectToPOS(config: POSConnectionConfig): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // In production, validate API key with provider first
      const { data, error } = await supabase
        .from('pos_connections')
        .insert({
          user_id: user.id,
          provider: config.provider,
          api_key_encrypted: config.apiKey, // In production, encrypt this
          store_id: config.storeId,
          sync_frequency: config.syncFrequency || 'hourly',
          status: 'active'
        })
        .select()
        .single();

      if (error) throw error;

      console.log(`Connected to ${config.provider} POS system`);
      toast.success(`Connected to ${config.provider} POS system`);
      return true;
    } catch (error: any) {
      console.error('POS connection error:', error);
      toast.error(error.message || 'Failed to connect to POS system');
      return false;
    }
  }

  async disconnectFromPOS(connectionId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('pos_connections')
        .delete()
        .eq('id', connectionId);

      if (error) throw error;

      toast.success('Disconnected from POS system');
      return true;
    } catch (error: any) {
      console.error('POS disconnection error:', error);
      toast.error('Failed to disconnect from POS system');
      return false;
    }
  }

  async syncInventory(connectionId: string): Promise<any[]> {
    try {
      const { data: connection } = await supabase
        .from('pos_connections')
        .select('*')
        .eq('id', connectionId)
        .single();

      if (!connection) throw new Error('Connection not found');

      // Call edge function to sync
      const { data, error } = await supabase.functions.invoke('pos-sync', {
        body: { 
          connectionId: connection.id,
          provider: connection.provider
        }
      });

      if (error) throw error;

      console.log('Synced inventory from POS system', data);
      toast.success(`Synced ${data.itemsSynced} items from POS system`);
      return data.items || [];
    } catch (error: any) {
      console.error('Inventory sync error:', error);
      toast.error('Failed to sync inventory');
      return [];
    }
  }

  async getConnections(): Promise<POSConnection[]> {
    try {
      const { data, error } = await supabase
        .from('pos_connections')
        .select('id, provider, status, last_synced_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []).map(conn => ({
        id: conn.id,
        provider: conn.provider as POSProvider,
        status: conn.status,
        last_synced_at: conn.last_synced_at
      }));
    } catch (error) {
      console.error('Failed to fetch connections:', error);
      return [];
    }
  }

  async isConnectedToPOS(): Promise<boolean> {
    const connections = await this.getConnections();
    return connections.some(conn => conn.status === 'active');
  }
}

export default POSIntegrationService;
export type { POSProvider, POSConnectionConfig, POSConnection };
