import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.76.1";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      throw new Error('Unauthorized');
    }

    // Check rate limit: 100 requests per day
    const { data: rateLimitOk, error: rateLimitError } = await supabaseClient.rpc('check_rate_limit', {
      _user_id: user.id,
      _endpoint: 'pos-sync',
      _max_requests: 100,
      _window_minutes: 1440
    });

    if (rateLimitError || !rateLimitOk) {
      console.log('Rate limit exceeded for user:', user.id);
      return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again tomorrow.' }), {
        status: 429,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'Retry-After': '86400'
        },
      });
    }

    // Validate input
    const requestSchema = z.object({
      connectionId: z.string().uuid('Invalid connection ID format'),
      provider: z.enum(['square', 'toast', 'lightspeed', 'clover', 'shopify'], {
        errorMap: () => ({ message: 'Provider must be square, toast, lightspeed, clover, or shopify' })
      })
    });

    const rawBody = await req.json();
    const validationResult = requestSchema.safeParse(rawBody);
    
    if (!validationResult.success) {
      console.log('Validation error:', validationResult.error.format());
      return new Response(
        JSON.stringify({ 
          error: 'Invalid input parameters',
          details: validationResult.error.format()
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { connectionId, provider } = validationResult.data;

    console.log(`Starting POS sync for connection ${connectionId}, provider: ${provider}`);

    // Get connection details
    const { data: connection, error: connError } = await supabaseClient
      .from('pos_connections')
      .select('*')
      .eq('id', connectionId)
      .eq('user_id', user.id)
      .single();

    if (connError || !connection) {
      throw new Error('Connection not found');
    }

    // Decrypt the API key using service role client
    const serviceClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: decryptedKey, error: decryptError } = await serviceClient
      .rpc('decrypt_pos_api_key', { encrypted_key: connection.api_key_encrypted });

    if (decryptError || !decryptedKey) {
      console.error('Decryption error:', decryptError);
      throw new Error('Failed to decrypt API key');
    }

    let inventoryItems = [];
    let syncError = null;

    // Sync based on provider
    if (provider === 'square') {
      try {
        // Square API integration would go here
        // For now, return mock data with proper structure
        inventoryItems = await syncSquareInventory(decryptedKey, connection.store_id);
      } catch (error) {
        syncError = { message: error.message, provider: 'square' };
      }
    } else if (provider === 'toast') {
      try {
        inventoryItems = await syncToastInventory(decryptedKey, connection.store_id);
      } catch (error) {
        syncError = { message: error.message, provider: 'toast' };
      }
    }

    // Log sync results
    const { error: logError } = await supabaseClient
      .from('pos_sync_logs')
      .insert({
        connection_id: connectionId,
        items_synced: inventoryItems.length,
        errors: syncError ? [syncError] : null
      });

    // Update connection last_synced_at
    await supabaseClient
      .from('pos_connections')
      .update({ 
        last_synced_at: new Date().toISOString(),
        status: syncError ? 'error' : 'active'
      })
      .eq('id', connectionId);

    console.log(`Sync completed. Items synced: ${inventoryItems.length}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        itemsSynced: inventoryItems.length,
        items: inventoryItems,
        error: syncError
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in pos-sync:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function syncSquareInventory(apiKey: string, storeId: string | null) {
  // In production, this would call Square's Catalog API
  // For demo purposes, return structured mock data
  return [
    { 
      id: 'sq_prod_1', 
      name: 'Organic Lettuce', 
      quantity: 15, 
      expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      category: 'Produce',
      unit: 'heads',
      cost: 2.50
    },
    { 
      id: 'sq_prod_2', 
      name: 'Artisan Bread', 
      quantity: 8, 
      expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      category: 'Bakery',
      unit: 'loaves',
      cost: 5.00
    },
  ];
}

async function syncToastInventory(apiKey: string, storeId: string | null) {
  // In production, this would call Toast's Inventory API
  return [
    { 
      id: 'toast_prod_1', 
      name: 'Fresh Salmon', 
      quantity: 5, 
      expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      category: 'Seafood',
      unit: 'lbs',
      cost: 12.00
    },
    { 
      id: 'toast_prod_2', 
      name: 'Caesar Salad Mix', 
      quantity: 12, 
      expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      category: 'Produce',
      unit: 'bags',
      cost: 3.50
    },
  ];
}
