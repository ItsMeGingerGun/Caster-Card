import { getUserStats } from '@/app/lib/neynarClient';
import { NextResponse } from 'next/server';
import { sdk } from '@farcaster/miniapp-sdk';

export async function GET(req: Request) {
  try {
    // Verify authentication using SDK
    const isAuthenticated = await sdk.quickAuth.verify();
    
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get authenticated user's FID
    const user = await sdk.quickAuth.getUser();
    const fid = user.fid;
    
    if (!fid) {
      return NextResponse.json(
        { error: 'Missing fid parameter' },
        { status: 400 }
      );
    }
    
    const userData = await getUserStats(Number(fid));
    
    // Convert dates to strings
    return NextResponse.json({
      ...userData,
      registeredAt: userData.registeredAt.toISOString()
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}
