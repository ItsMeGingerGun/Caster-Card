import { NextResponse } from 'next/server';
import { sdk } from '@farcaster/miniapp-sdk';

export async function GET(request: Request) {
  try {
    // Handle authentication callback
    await sdk.quickAuth.handleAuthCallback(request.url);
    
    // Redirect to home page after successful authentication
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/`);
  } catch (error) {
    console.error('Authentication callback failed:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?error=auth_failed`);
  }
}
