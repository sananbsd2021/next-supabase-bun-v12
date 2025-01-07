import { supabase } from '@/utils/supabaseClient';
import { NextResponse, NextRequest } from 'next/server';

interface ContactsItem {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt?: string;
}

// Helper function to validate request body
function validateContactsItem(body: Partial<ContactsItem>): { valid: boolean; message?: string } {
  if (typeof body.email !== 'string' || !body.email.trim()) {
    return { valid: false, message: 'Email is required and must be a non-empty string.' };
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
      const { data: contact, error } = await supabase
        .from('contact')
        .select('*')
        .order('createdAt', { ascending: false })
        .range(start, start + limit - 1);
  
      if (error) {
        console.error('Supabase Error:', error.message);
        return createErrorResponse('Failed to fetch contacts.', 500);
      }
  
      return NextResponse.json(
        { success: true, data: contact, message: 'Contacts fetched successfully.' },
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
    const body: Partial<ContactsItem> = await request.json();

    const { valid, message } = validateContactsItem(body);
    if (!valid) {
      return createErrorResponse(message || 'Invalid request body.', 400);
    }

    const { data, error } = await supabase.from('contact').insert([body]).select();

    if (error) {
      console.error('Supabase Error (POST):', error);
      return createErrorResponse('Failed to create contact.');
    }

    return NextResponse.json(
      { success: true, data, message: 'Contact created successfully.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error (POST):', error);
    return createErrorResponse('Invalid request body.', 400);
  }
}

