import { getUserStats } from '@/app/lib/neynarClient';
import { NextResponse } from 'next/server';
import { verifySignInMessage } from '@farcaster/miniapp-sdk'; // Import directly

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
    
    // Verify the request first using the standalone function
    const verifiedData = await verifySignInMessage(req);
    
    if (!verifiedData || !verifiedData.fid || verifiedData.fid !== Number(fid)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const userData = await getUserStats(Number(fid));
    
    // Return userData directly
    return NextResponse.json(userData);
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}
