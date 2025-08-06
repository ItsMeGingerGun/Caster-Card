import { NextResponse } from 'next/server';
import { sdk } from '@farcaster/miniapp-sdk';

export async function GET() {
  try {
    // Start Farcaster authentication flow
    const authUrl = await sdk.quickAuth.getAuthUrl({
      redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
    });
    
    // Redirect to Farcaster authentication
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Authentication failed:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
