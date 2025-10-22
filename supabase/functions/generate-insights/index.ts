import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the authorization header
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Get the user from the JWT token
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    // Get user's waste entries from the last 30 days
    const { data: wasteEntries, error: wasteError } = await supabase
      .from('waste_entries')
      .select('*')
      .eq('user_id', user.id)
      .gte('date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
      .order('date', { ascending: false });

    if (wasteError) {
      console.error('Error fetching waste entries:', wasteError);
      throw wasteError;
    }

    // Get user's donations from the last 30 days
    const { data: donations, error: donationsError } = await supabase
      .from('donations')
      .select('*')
      .eq('user_id', user.id)
      .gte('donation_date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
      .order('donation_date', { ascending: false });

    if (donationsError) {
      console.error('Error fetching donations:', donationsError);
      throw donationsError;
    }

    // Calculate summary statistics
    const totalWaste = wasteEntries?.reduce((sum, entry) => sum + Number(entry.quantity), 0) || 0;
    const totalCost = wasteEntries?.reduce((sum, entry) => sum + (Number(entry.cost) || 0), 0) || 0;
    const totalDonations = donations?.reduce((sum, donation) => sum + Number(donation.quantity), 0) || 0;
    const totalDonationValue = donations?.reduce((sum, donation) => sum + (Number(donation.estimated_value) || 0), 0) || 0;

    // Prepare data for AI analysis
    const dataForAI = {
      wasteEntries: wasteEntries?.length || 0,
      totalWaste,
      totalCost,
      donations: donations?.length || 0,
      totalDonations,
      totalDonationValue,
      categories: wasteEntries?.reduce((acc: any, entry) => {
        acc[entry.category] = (acc[entry.category] || 0) + 1;
        return acc;
      }, {}) || {},
      topWasteReasons: wasteEntries?.reduce((acc: any, entry) => {
        if (entry.reason) {
          acc[entry.reason] = (acc[entry.reason] || 0) + 1;
        }
        return acc;
      }, {}) || {}
    };

    // Call Lovable AI to generate insights
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are an expert food waste reduction consultant. Analyze the data and provide actionable insights and recommendations to help reduce food waste.'
          },
          {
            role: 'user',
            content: `Analyze this food waste data from the last 30 days and provide insights:
            
${JSON.stringify(dataForAI, null, 2)}

Please provide:
1. A brief summary of the waste patterns (2-3 sentences)
2. 3-5 specific, actionable recommendations to reduce waste
3. Positive reinforcement for any good practices

Format your response as JSON with this structure:
{
  "title": "Monthly Waste Analysis",
  "summary": "Your summary here",
  "recommendations": [
    {"action": "recommendation 1", "impact": "expected impact"},
    {"action": "recommendation 2", "impact": "expected impact"}
  ],
  "positives": ["positive 1", "positive 2"]
}`
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const aiData = await response.json();
    const aiResponse = aiData.choices[0].message.content;
    
    // Parse the AI response
    let insights;
    try {
      insights = JSON.parse(aiResponse);
    } catch (e) {
      // If parsing fails, create a structured response from the text
      insights = {
        title: "Monthly Waste Analysis",
        summary: aiResponse,
        recommendations: [],
        positives: []
      };
    }

    // Store the insight in the database
    const { data: savedInsight, error: insertError } = await supabase
      .from('ai_insights')
      .insert({
        user_id: user.id,
        insight_type: 'waste_analysis',
        title: insights.title,
        content: insights.summary,
        recommendations: insights.recommendations || []
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error saving insight:', insertError);
      throw insertError;
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        insight: savedInsight,
        data: dataForAI 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error: any) {
    console.error('Error in generate-insights function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
