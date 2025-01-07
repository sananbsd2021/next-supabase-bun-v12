import { supabase } from '@/utils/supabaseClient';
import { NextResponse, NextRequest } from 'next/server';

interface PostsItem {
  id: number;
  title: string;
  description: string;
  createdAt?: string;
}

// Helper function to validate request body
function validatePostsItem(body: Partial<PostsItem>): { valid: boolean; message?: string } {
  if (typeof body.title !== 'string' || !body.title.trim()) {
    return { valid: false, message: 'Title is required and must be a non-empty string.' };
  }
  return { valid: true };
}

// Helper function to return error responses
function createErrorResponse(message: string, status: number = 500) {
  return NextResponse.json({ success: false, message }, { status });
}

export async function GET(request: NextRequest): Promise<NextResponse> {
    const url = new URL(request.url);
    const start = parseInt(url.searchParams.get('start') || '0', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);
  
    try {
      const { data: posts, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .range(start, start + limit - 1);
  
      if (error) {
        console.error('Supabase Error:', error.message);
        return createErrorResponse('Failed to fetch posts.', 500);
      }
  
      return NextResponse.json(
        { success: true, data: posts, message: 'Posts fetched successfully.' },
        { status: 200 }
      );
    } catch (err) {
      console.error('Unhandled Error:', err);
      return createErrorResponse('An unexpected error occurred.', 500);
    }
  }
  

// POST: Add a new post
export async function POST(request: Request) {
  try {
    const body: Partial<PostsItem> = await request.json();

    const { valid, message } = validatePostsItem(body);
    if (!valid) {
      return createErrorResponse(message || 'Invalid request body.', 400);
    }

    const { data, error } = await supabase.from('posts').insert([body]).select();

    if (error) {
      console.error('Supabase Error (POST):', error);
      return createErrorResponse('Failed to create post.');
    }

    return NextResponse.json(
      { success: true, data, message: 'Post created successfully.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error (POST):', error);
    return createErrorResponse('Invalid request body.', 400);
  }
}

