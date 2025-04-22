import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    const { data: topicsData, error: topicsError } = await supabase
      .from('topics')
      .select('*')
      .order('order_index', { ascending: true });

    if (topicsError) {
      throw topicsError;
    }

    // Add styling for each topic
    const styledTopics = topicsData.map(topic => {
      const styles = {
        'thoi-ky-bac-thuoc': {
          bgGradient: 'bg-[#FFF7E6]',
          textColor: 'text-[#B25B00]',
          countBg: 'bg-[#FFE4B3]',
          countText: 'text-[#B25B00]'
        },
        'thoi-ky-dai-viet': {
          bgGradient: 'bg-[#E6F4FF]',
          textColor: 'text-[#0958D9]',
          countBg: 'bg-[#BAE0FF]',
          countText: 'text-[#0958D9]'
        },
        'cach-mang-viet-nam': {
          bgGradient: 'bg-[#FFF1F0]',
          textColor: 'text-[#CF1322]',
          countBg: 'bg-[#FFCCC7]',
          countText: 'text-[#CF1322]'
        },
        'viet-nam-hien-dai': {
          bgGradient: 'bg-[#F6FFED]',
          textColor: 'text-[#389E0D]',
          countBg: 'bg-[#D9F7BE]',
          countText: 'text-[#389E0D]'
        },
        'tao-ngau-nhien': {
          bgGradient: 'bg-[#F9F0FF]',
          textColor: 'text-[#531DAB]',
          countBg: 'bg-[#EFDBFF]',
          countText: 'text-[#531DAB]'
        }
      };

      return {
        ...topic,
        ...styles[topic.slug as keyof typeof styles] || styles['tao-ngau-nhien']
      };
    });

    return NextResponse.json(styledTopics);
  } catch (error) {
    console.error('Error fetching topics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch topics' },
      { status: 500 }
    );
  }
} 