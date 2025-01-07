import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabaseClient';

// POST handler to create a new gallery item
export async function POST(request: Request) {
  try {
    const body = await request.json(); // Parse the request body
    const { title, description, imageUrl } = body;

    if (!title || !imageUrl) {
      return NextResponse.json({ success: false, error: 'Title and imageUrl are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('gallery')
      .insert([{ title, description, imageUrl }])
      .select('*')
      .single(); // Ensure the inserted record is returned

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error('Error creating gallery item:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

// GET handler to fetch all gallery items
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
