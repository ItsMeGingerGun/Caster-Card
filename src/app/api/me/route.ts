// Remove verifyQuickAuth import
import { getUserStats } from '@/app/lib/neynarClient';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    // Temporary solution - get FID from query params
    const url = new URL(req.url);
    const fid = url.searchParams.get('fid');
    
    if (!fid) {
      return NextResponse.json(
        { error: 'Missing fid parameter' },
        { status: 400 }
      );
    }
    
    const userData = await getUserStats(Number(fid));
    return NextResponse.json(userData);
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}
