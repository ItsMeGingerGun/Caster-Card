import { getUserStats } from '@/app/lib/neynarClient';
import { NextResponse } from 'next/server';
import { sdk } from '@farcaster/miniapp-sdk';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const fid = url.searchParams.get('fid');
    
    if (!fid) {
      return NextResponse.json(
        { error: 'Missing fid parameter' },
        { status: 400 }
      );
    }
    
    // Verify the request first
    const verifiedData = await sdk.verifySignInMessage(req);
    
    if (!verifiedData || !verifiedData.fid || verifiedData.fid !== Number(fid)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const userData = await getUserStats(Number(fid));
    
    // Return userData directly without adding registeredAt
    return NextResponse.json(userData);
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}
