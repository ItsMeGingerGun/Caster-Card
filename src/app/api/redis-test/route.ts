import { NextResponse } from 'next/server';
import { getRedisClient } from '@/app/lib/redis';

export async function GET() {
  try {
    const redis = getRedisClient();
    
    // Test connection
    await redis.set('test', 'success', 'EX', 10);
    const value = await redis.get('test');
    
    // Test error handling
    if (value !== 'success') {
      throw new Error('Redis test value mismatch');
    }
    
    return NextResponse.json({
      status: 'success',
      redis: 'connected'
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: error.message,
      redis_url: process.env.REDIS_URL
    }, { status: 500 });
  }
}
