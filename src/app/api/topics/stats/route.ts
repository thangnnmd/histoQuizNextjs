import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('questions')
      .select('topic, difficulty')
      .then(result => {
        if (result.error) throw result.error;
        
        // Group by topic and count difficulties
        const stats = result.data.reduce((acc: any, curr) => {
          if (!acc[curr.topic]) {
            acc[curr.topic] = {
              total: 0,
              easy: 0,
              medium: 0,
              hard: 0
            };
          }
          
          acc[curr.topic].total++;
          acc[curr.topic][curr.difficulty]++;
          
          return acc;
        }, {});

        return { data: stats, error: null };
      });

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching topic stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch topic statistics' },
      { status: 500 }
    );
  }
} 