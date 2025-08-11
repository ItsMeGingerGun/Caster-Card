import { NextResponse } from 'next/server';
import { getUserStats } from '@/app/lib/neynarClient'; // Corrected import path

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fid = searchParams.get('fid');

  if (!fid) {
    return NextResponse.json({ error: 'FID required' }, { status: 400 });
  }

  try {
    const userData = await getUserStats(parseInt(fid)); // Use getUserStats function
    return NextResponse.json(userData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
}
