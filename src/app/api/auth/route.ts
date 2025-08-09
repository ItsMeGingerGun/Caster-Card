import { NextResponse } from 'next/server';
import { createClient, Errors } from '@farcaster/quick-auth';
import { getUserStats } from '@/app/lib/neynarClient';

// Create Quick Auth client
const client = createClient();

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
    
    // Verify the token
    const payload = await client.verifyJwt({ 
      token,
      domain: process.env.NEXT_PUBLIC_APP_DOMAIN || 'localhost'
    });
    
    // Get user stats using FID from token
    const userData = await getUserStats(payload.sub);
    
    return NextResponse.json(userData);
  } catch (error) {
    console.error('Auth error:', error);
    
    if (error instanceof Errors.InvalidTokenError) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
