import { NextResponse } from 'next/server';
import { getUserStats } from '@/app/lib/neynarClient';

// Prevent static generation and ensure Node.js runtime
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fid = searchParams.get('fid');
  
  if (!fid) {
    return NextResponse.json({ error: 'FID required' }, { status: 400 });
  }
  
  try {
    const userData = await getUserStats(parseInt(fid));
    
    // Create response with cache headers
    const response = NextResponse.json(userData);
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30');
    return response;
  } catch (error) {
    console.error('User API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' }, 
      { status: 500 }
    );
  }
}
