import { NextRequest, NextResponse } from 'next/server';
import { sdk } from '@farcaster/miniapp-sdk';

export async function GET(request: NextRequest) {
  try {
    // Handle authentication callback
    const token = await sdk.quickAuth.handleAuthCallback(request.url);
    
    // Set token in cookies or session
    const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/`);
    response.cookies.set('farcaster-token', token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    
    return response;
  } catch (error) {
    console.error('Authentication callback failed:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
