import { supabase } from '@/utils/supabaseClient';
import { NextResponse } from 'next/server';

// TypeScript interface for NewslistItem
interface NewslistItem {
  id: number;
  title: string;
  imageUrl: string;
  createdAt?: string;
}

// Helper function to validate request body
function validateNewslistItem(body: Partial<NewslistItem>): { valid: boolean; message?: string } {
  if (typeof body.title !== 'string' || !body.title.trim()) {
    return { valid: false, message: 'Title is required and must be a non-empty string.' };
  }
  if (typeof body.imageUrl !== 'string' || !body.imageUrl.trim()) {
    return { valid: false, message: 'Image URL is required and must be a valid string.' };
  }
  return { valid: true };
}

// Helper function to return error responses
function createErrorResponse(message: string, status: number = 500) {
  return NextResponse.json({ success: false, message }, { status });
}

// GET: Fetch all newslist items
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const start = parseInt(url.searchParams.get('start') || '0', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);

    const { data: newslist, error } = await supabase
      .from('newslist')
      .select('*')
      .order('createdAt', { ascending: false })
      .range(start, start + limit - 1);

    if (error) {
      console.error('Supabase Error (GET):', error);
      return createErrorResponse('Failed to fetch newslist items.');
    }

    return NextResponse.json(
      { success: true, data: newslist, message: 'Newslist items fetched successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error (GET):', error);
    return createErrorResponse('An unexpected error occurred.');
  }
}

// POST: Add a new newslist item
export async function POST(request: Request) {
  try {
    const body: Partial<NewslistItem> = await request.json();

    // Validate the request body
    const { valid, message } = validateNewslistItem(body);
    if (!valid) {
      return createErrorResponse(message || 'Invalid request body.', 400);
    }

    // Insert the new newslist item into the database
    const { data, error } = await supabase.from('newslist').insert([body]).select();

    if (error) {
      console.error('Supabase Error (POST):', error);
      return createErrorResponse('Failed to create newslist item.');
    }

    return NextResponse.json(
      { success: true, data, message: 'Newslist item created successfully.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error (POST):', error);
    return createErrorResponse('Invalid request body.', 400);
  }
}

// PUT: Update an existing newslist item
export async function PUT(request: Request) {
  try {
    const body: Partial<NewslistItem> = await request.json();

    if (!body.id) {
      return createErrorResponse('ID is required for updating an item.', 400);
    }

    // Validate the request body
    const { valid, message } = validateNewslistItem(body);
    if (!valid) {
      return createErrorResponse(message || 'Invalid request body.', 400);
    }

    // Update the existing newslist item
    const { data, error } = await supabase
      .from('newslist')
      .update(body)
      .eq('id', body.id)
      .select();

    if (error) {
      console.error('Supabase Error (PUT):', error);
      return createErrorResponse('Failed to update newslist item.');
    }

    if (!data.length) {
      return createErrorResponse('Newslist item not found.', 404);
    }

    return NextResponse.json(
      { success: true, data, message: 'Newslist item updated successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error (PUT):', error);
    return createErrorResponse('Invalid request body.', 400);
  }
}

// DELETE: Remove a newslist item
export async function DELETE(request: Request) {
  try {
    const body: { id: number } = await request.json();

    if (!body.id) {
      return createErrorResponse('ID is required for deleting an item.', 400);
    }

    // Delete the newslist item from the database
    const { data, error } = await supabase.from('newslist').delete().eq('id', body.id).select();

    if (error) {
      console.error('Supabase Error (DELETE):', error);
      return createErrorResponse('Failed to delete newslist item.');
    }

    if (!data.length) {
      return createErrorResponse('Newslist item not found.', 404);
    }

    return NextResponse.json(
      { success: true, data, message: 'Newslist item deleted successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error (DELETE):', error);
    return createErrorResponse('Invalid request body.', 400);
  }
}
