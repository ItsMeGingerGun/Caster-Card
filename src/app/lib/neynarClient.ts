import { NeynarAPIClient } from '@neynar/nodejs-sdk';
import { getRedisClient } from './redis';

// Initialize Neynar client
export const neynarClient = new NeynarAPIClient(process.env.NEYNAR_API_KEY!);

// Cache duration in seconds (1 hour)
const CACHE_TTL = 3600;

export async function getUserStats(fid: number) {
  const redis = getRedisClient();
  const cacheKey = `user:${fid}:stats`;
  
  // Try to get cached data
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  try {
    // Fetch user data from Neynar
    const user = await neynarClient.lookupUserByFid(fid);
    
    // Calculate Neynar score (example algorithm)
    const verificationWeight = user.result.user.verifications.length > 0 ? 30 : 0;
    const followerWeight = Math.min(user.result.user.follower_count / 1000, 40);
    const engagementWeight = Math.min((user.result.user.casts.count + user.result.user.replies.count) / 100, 30);
    const score = Math.round(verificationWeight + followerWeight + engagementWeight);
    
    // Prepare response data
    const userData = {
      fid,
      username: user.result.user.username,
      pfpUrl: user.result.user.pfp.url,
      bio: user.result.user.profile.bio?.text || '',
      casts: user.result.user.casts.count,
      replies: user.result.user.replies.count,
      followers: user.result.user.follower_count,
      following: user.result.user.following_count,
      score,
      registeredAt: new Date(user.result.user.registered_at),
    };
    
    // Cache the data
    await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(userData));
    
    return userData;
  } catch (error) {
    console.error('Error fetching user stats:', error);
    throw new Error('Failed to fetch user data from Neynar API');
  }
}
