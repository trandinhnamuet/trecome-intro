import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';
import { addToGoogleSheet } from '@/lib/sheets';

interface ContactData {
  name: string;
  email: string;
  phone: string;
  brand: string;
  plan: string;
  msg: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactData = await request.json();

    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Send email
    const emailSent = await sendContactEmail(body);

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Add to Google Sheet (non-blocking)
    try {
      await addToGoogleSheet(body);
    } catch (error) {
      console.error('Failed to add to sheet:', error);
      // Don't fail the request if sheets fails
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
