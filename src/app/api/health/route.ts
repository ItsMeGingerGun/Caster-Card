import { NextResponse } from 'next/server';
import { getRedisClient } from '@/app/lib/redis';

export async function GET() {
  try {
    const redis = getRedisClient();
    
    // Test Redis connection
    await redis.ping();
    
    return NextResponse.json({
      status: 'ok',
      redis: 'connected',
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json({
      status: 'error',
      redis: 'disconnected',
    }, { status: 500 });
  }
}
