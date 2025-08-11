import { NextResponse } from 'next/server';
import { fetchUserData } from '@/lib/neynar'; // Your existing Neynar helper

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fid = searchParams.get('fid');

  if (!fid) {
    return NextResponse.json({ error: 'FID required' }, { status: 400 });
  }

  try {
    const userData = await fetchUserData(parseInt(fid));
    return NextResponse.json(userData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
}
