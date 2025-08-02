import { verifyQuickAuth } from '@farcaster/miniapp-sdk/server';
import { getUserStats } from '@/app/lib/neynarClient';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const headers = Object.fromEntries(req.headers.entries());
    const body = await req.text();
    
    const { fid } = await verifyQuickAuth({ headers, body });
    
    const userData = await getUserStats(fid);
    return NextResponse.json(userData);
  } catch (error) {
    console.error('Auth verification error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    );
  }
}
