import { supabase } from '@/utils/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

// Newslist item type definition
interface NewsItem {
  id?: number;
  title: string;
  description?: string;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

// Helper function to validate request body
function validateNewsItem(body: Partial<NewsItem>): { valid: boolean; message?: string } {
  if (!body.title || typeof body.title !== 'string') {
    return { valid: false, message: 'Title is required and must be a string.' };
  }
  if (!body.imageUrl || typeof body.imageUrl !== 'string') {
    return { valid: false, message: 'Image URL is required and must be a string.' };
  }
  return { valid: true };
}

// Helper function to create error responses
function createErrorResponse(message: string, status: number = 500): NextResponse {
  return NextResponse.json(
    { success: false, message },
    { status }
  );
}

// GET: Fetch all newslist items
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { data: news, error } = await supabase
      .from('news')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Supabase Error:', error.message);
      return createErrorResponse('Failed to fetch news items.', 500);
    }

    return NextResponse.json(
      { success: true, data: news, message: 'News items fetched successfully.' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Unhandled Error:', err);
    return createErrorResponse('An unexpected error occurred.', 500);
  }
}

// POST: Add a new newslist item
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();

    // Validate the request body using the helper function
    const validation = validateNewsItem(body);
    if (!validation.valid) {
      return createErrorResponse(validation.message!, 400);
    }

    // Insert the new item into the database
    const { data, error } = await supabase
      .from('news')
      .insert([body])
      .select();

    if (error) {
      console.error('Supabase Error:', error.message);
      return createErrorResponse('Failed to create news item.', 500);
    }

    return NextResponse.json(
      { success: true, data, message: 'News item created successfully.' },
      { status: 201 }
    );
  } catch (err) {
    console.error('Unhandled Error:', err);
    return createErrorResponse('Invalid request body or unexpected error.', 400);
  }
}
