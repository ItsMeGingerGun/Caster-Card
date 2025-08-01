import { getUserStats } from '@/app/lib/neynarClient';
import { NextResponse } from 'next/server';
import { getRedisClient } from '@/app/lib/redis';
import { verifySignature } from '@/app/lib/auth';

export async function POST(req: Request) {
  const { fid, message, signature, address } = await req.json();
  
  if (!fid || !message || !signature || !address) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );
  }

  // Verify the signature
  const isValid = await verifySignature(message, signature, address);
  
  if (!isValid) {
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 401 }
    );
  }

  try {
    const redis = getRedisClient();
    const cacheKey = `user:${fid}:stats`;
    
    // Try to get cached stats
    const cachedStats = await redis.get(cacheKey);
    if (cachedStats) {
      return NextResponse.json(JSON.parse(cachedStats));
    }
    
    // Fetch fresh stats
    const userData = await getUserStats(fid);
    
    // Cache the response
    await redis.setex(cacheKey, 3600, JSON.stringify(userData));
    
    return NextResponse.json(userData);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user stats' },
      { status: 500 }
    );
  }
}
