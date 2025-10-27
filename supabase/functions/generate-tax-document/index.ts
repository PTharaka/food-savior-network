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

    // Check rate limit: 50 requests per day
    const { data: rateLimitOk, error: rateLimitError } = await supabaseClient.rpc('check_rate_limit', {
      _user_id: user.id,
      _endpoint: 'generate-tax-document',
      _max_requests: 50,
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
      documentType: z.enum(['irs_8283', 'donation_summary'], {
        errorMap: () => ({ message: 'Document type must be either irs_8283 or donation_summary' })
      }),
      taxYear: z.number().int().min(2000).max(2100, 'Tax year must be between 2000 and 2100'),
      period: z.string().regex(/^\d{4}-(Q[1-4]|annual)$/, 'Period must be in format YYYY-Q1 through YYYY-Q4 or YYYY-annual')
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

    const { documentType, taxYear, period } = validationResult.data;

    console.log(`Generating ${documentType} for year ${taxYear}, period ${period}`);

    // Get user profile
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    // Get donations for the period
    const { data: donations, error: donationsError } = await supabaseClient
      .from('donations')
      .select(`
        *,
        donation_tax_details (*)
      `)
      .eq('user_id', user.id)
      .gte('donation_date', `${taxYear}-01-01`)
      .lte('donation_date', `${taxYear}-12-31`)
      .eq('status', 'completed');

    if (donationsError) {
      throw new Error('Failed to fetch donations');
    }

    // Calculate totals
    const totalDonationValue = donations?.reduce((sum, d) => sum + (Number(d.estimated_value) || 0), 0) || 0;
    const totalDeduction = totalDonationValue * 0.85; // Typical deduction rate

    // Generate PDF document (in production, use a PDF library like PDFKit)
    const documentData = generateDocumentData(documentType, {
      profile,
      donations,
      taxYear,
      period,
      totalDonationValue,
      totalDeduction
    });

    // Create tax document record
    const { data: taxDoc, error: docError } = await supabaseClient
      .from('tax_documents')
      .insert({
        user_id: user.id,
        document_type: documentType,
        tax_year: taxYear,
        period: period,
        total_donation_value: totalDonationValue,
        total_deduction: totalDeduction,
        pdf_url: `#placeholder-${Date.now()}`, // In production, upload to storage
        status: 'draft',
        generated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (docError) {
      throw new Error('Failed to create tax document');
    }

    // Link donations to tax document
    if (donations && donations.length > 0) {
      const taxDetails = donations.map(donation => ({
        donation_id: donation.id,
        tax_document_id: taxDoc.id,
        fair_market_value: Number(donation.estimated_value) || 0,
        deduction_amount: (Number(donation.estimated_value) || 0) * 0.85,
        receipt_number: `WW-${Date.now()}-${donation.id.substring(0, 8)}`,
        appraisal_required: (Number(donation.estimated_value) || 0) > 5000
      }));

      await supabaseClient
        .from('donation_tax_details')
        .insert(taxDetails);
    }

    console.log(`Tax document generated: ${taxDoc.id}`);

    return new Response(
      JSON.stringify({ 
        success: true,
        document: taxDoc,
        documentData,
        message: `${documentType} generated successfully`
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in generate-tax-document:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function generateDocumentData(documentType: string, data: any) {
  const { profile, donations, taxYear, totalDonationValue, totalDeduction } = data;

  if (documentType === 'irs_8283') {
    return {
      formName: 'IRS Form 8283',
      formTitle: 'Noncash Charitable Contributions',
      taxYear,
      taxpayerInfo: {
        name: profile?.business_name || 'N/A',
        ein: 'XX-XXXXXXX', // Would be from profile
        address: profile?.address || 'N/A'
      },
      donationsSummary: {
        totalItems: donations?.length || 0,
        totalValue: totalDonationValue,
        totalDeduction
      },
      donations: donations?.map((d: any) => ({
        date: d.donation_date,
        recipient: d.recipient_name,
        description: d.item_name,
        quantity: d.quantity,
        fairMarketValue: d.estimated_value,
        methodOfValuation: 'Market Price'
      })) || [],
      certificationText: 'I declare that the above information is true and correct to the best of my knowledge.'
    };
  }

  if (documentType === 'donation_summary') {
    return {
      documentName: 'Donation Summary Report',
      period: data.period,
      businessInfo: {
        name: profile?.business_name || 'N/A',
        type: profile?.business_type || 'N/A'
      },
      summary: {
        totalDonations: donations?.length || 0,
        totalValue: totalDonationValue,
        estimatedTaxSavings: totalDeduction * 0.21, // Corporate tax rate
        co2Saved: (donations?.reduce((sum: number, d: any) => sum + Number(d.quantity), 0) || 0) * 2.5 // kg CO2 per kg food
      },
      donationsList: donations || []
    };
  }

  return {};
}
