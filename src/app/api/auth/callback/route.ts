import { NextResponse } from 'next/server';
import { sdk } from '@farcaster/miniapp-sdk';

export async function GET(request: Request) {
  try {
    // Handle authentication callback - CORRECT METHOD NAME
    const { token } = await sdk.quickAuth.getTokenFromCallback(request.url);
    
    // Set token in cookies
    const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/`);
    response.cookies.set('farcaster-token', token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    
    return response;
  } catch (error) {
    console.error('Authentication callback failed:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?error=auth_failed`);
  }
}
