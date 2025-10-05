import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const prompt = `Generate a JSON array of 9 diverse travel destinations based on: "${query}". 

For each destination, provide:
- id: a unique identifier
- name: the destination name
- description: a compelling 2-3 sentence description
- image: a realistic Unsplash image URL (use format: https://images.unsplash.com/photo-[random-id]?w=800&h=600&fit=crop)
- category: one of [Landmark, Nature, Museum, Beach, Mountain, City, Historical]
- rating: a realistic rating between 4.0 and 5.0

Return ONLY valid JSON array, no additional text. Example format:
[{"id":"1","name":"Santorini, Greece","description":"...","image":"https://images.unsplash.com/...","category":"Beach","rating":4.8}]`;

    console.log('Searching destinations for:', query);

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
            content: 'You are a travel destination expert. Always respond with valid JSON only.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please add credits to your workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error('Failed to fetch destinations');
    }

    const data = await response.json();
    let content = data.choices[0].message.content;

    // Clean up the response to extract JSON
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    let destinations;
    try {
      destinations = JSON.parse(content);
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      // Fallback to sample data
      destinations = [
        {
          id: "1",
          name: "Santorini, Greece",
          description: "Famous for its stunning sunsets and white-washed buildings with blue domes.",
          image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop",
          category: "Beach",
          rating: 4.9
        },
        {
          id: "2",
          name: "Kyoto, Japan",
          description: "Historic city with beautiful temples, gardens, and traditional culture.",
          image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
          category: "Historical",
          rating: 4.8
        },
        {
          id: "3",
          name: "Swiss Alps",
          description: "Breathtaking mountain scenery perfect for skiing and hiking adventures.",
          image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=600&fit=crop",
          category: "Mountain",
          rating: 4.9
        }
      ];
    }

    console.log('Destinations loaded successfully');

    return new Response(
      JSON.stringify({ destinations }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in explore-destinations:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to load destinations';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
