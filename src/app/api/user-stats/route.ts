import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { getUserStats } from '@/app/lib/neynarClient';
import { NextResponse } from 'next/server';
import { getRedisClient } from '@/app/lib/redis';

// Cache stats in Redis for 1 hour
const CACHE_TTL = 3600; 

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.fid) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const redis = getRedisClient();
    const cacheKey = `user:${session.user.fid}:stats`;
    
    // Try to get cached stats
    const cachedStats = await redis.get(cacheKey);
    if (cachedStats) {
      return NextResponse.json(JSON.parse(cachedStats));
    }
    
    // Fetch fresh stats
    const userData = await getUserStats(session.user.fid);
    
    // Cache the response
    await redis.set(cacheKey, JSON.stringify(userData), 'EX', CACHE_TTL);
    
    return NextResponse.json(userData);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user stats' },
      { status: 500 }
    );
  }
}
