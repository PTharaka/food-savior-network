import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.76.1";

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

    const { donationRequestId, notificationType } = await req.json();

    console.log(`Sending ${notificationType} notification for donation request ${donationRequestId}`);

    // Get donation request details
    const { data: request, error: requestError } = await supabaseClient
      .from('donation_requests')
      .select(`
        *,
        charity_organizations (
          name,
          email,
          phone,
          contact_person
        )
      `)
      .eq('id', donationRequestId)
      .eq('user_id', user.id)
      .single();

    if (requestError || !request) {
      throw new Error('Donation request not found');
    }

    const charity = request.charity_organizations as any;
    let notificationSent = false;

    // Send email notification
    if (charity.email && notificationType.includes('email')) {
      try {
        await sendEmailNotification(charity.email, request, charity);
        notificationSent = true;
        console.log(`Email sent to ${charity.email}`);
      } catch (error) {
        console.error('Email send failed:', error);
      }
    }

    // Send SMS notification (would use Twilio in production)
    if (charity.phone && notificationType.includes('sms')) {
      try {
        await sendSMSNotification(charity.phone, request, charity);
        notificationSent = true;
        console.log(`SMS sent to ${charity.phone}`);
      } catch (error) {
        console.error('SMS send failed:', error);
      }
    }

    // Update notification status
    if (notificationSent) {
      await supabaseClient
        .from('donation_requests')
        .update({ notification_sent: true })
        .eq('id', donationRequestId);
    }

    return new Response(
      JSON.stringify({ 
        success: notificationSent,
        message: notificationSent ? 'Notification sent successfully' : 'Failed to send notification'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in send-donation-notification:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function sendEmailNotification(email: string, request: any, charity: any) {
  // In production, integrate with Resend or similar
  console.log(`Would send email to: ${email}`);
  console.log(`Subject: New Food Donation Available from WasteWise`);
  console.log(`Body: ${charity.contact_person || 'Hello'}, a new donation is available: ${request.item_name} (${request.quantity} ${request.unit})`);
  
  // Simulate API call
  return new Promise((resolve) => setTimeout(resolve, 500));
}

async function sendSMSNotification(phone: string, request: any, charity: any) {
  // In production, integrate with Twilio
  console.log(`Would send SMS to: ${phone}`);
  console.log(`Message: WasteWise: New donation available - ${request.item_name} (${request.quantity} ${request.unit}). Login to view details.`);
  
  // Simulate API call
  return new Promise((resolve) => setTimeout(resolve, 500));
}
