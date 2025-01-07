import { supabase } from '@/utils/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

// NewsItem type definition
interface EduNewsItem {
  id?: number;
  title: string;
  description?: string;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

// Helper function to validate request body
function validateEduNewsItem(body: Partial<EduNewsItem>): { valid: boolean; message?: string } {
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
      .from('edunews')
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

// POST handler to create a new gallery item
export async function POST(request: Request) {
  try {
    const body = await request.json(); // Parse the request body
    const { title, description, imageUrl } = body;

    if (!title || !imageUrl) {
      return NextResponse.json({ success: false, error: 'Title and imageUrl are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('edunews')
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