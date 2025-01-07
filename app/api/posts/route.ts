import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabaseClient';

// POST handler to create a new record with dynamic input
export async function POST(request: Request) {
  try {
    const body = await request.json(); // Parse the dynamic request body

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { success: false, error: 'Request body cannot be empty' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('post') // Replace 'gallery' with your table name
      .insert([body])
      .select('*')
      .single(); // Return the inserted record

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error('Error creating record:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// GET handler to fetch all records
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('post') // Replace 'gallery' with your table name
      .select('*')
      .order('created_at', { ascending: false }); // Ensure consistent ordering if `createdAt` exists

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Error fetching records:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
