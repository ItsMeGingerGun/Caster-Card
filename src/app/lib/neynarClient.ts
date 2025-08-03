import { NeynarAPIClient } from '@neynar/nodejs-sdk';

export async function getUserStats(fid: number) {
  try {
    const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY!);
    
    // Fetch user profile
    const userResponse = await client.fetchBulkUsers([fid]);
    if (!userResponse.users || userResponse.users.length === 0) {
      throw new Error('User not found');
    }
    const user = userResponse.users[0];
    
    // Fetch user's casts using v2 method
    const castsResponse = await client.fetchAllCastsCreatedByUser(fid, { limit: 100 });
    const casts = castsResponse.result.casts;
    const replies = casts.filter(cast => cast.parent_hash).length;
    
    // Calculate engagement score - FIXED SYNTAX ERROR
    const score = Math.min(
      100, 
      Math.floor(
        (user.follower_count * 0.4) +
        (casts.length * 0.3) +
        (replies * 0.2) +
        (user.following_count * 0.1)
      )
    );

    return {
      fid: user.fid,
      username: user.username,
      pfpUrl: user.pfp_url,
      bio: user.profile.bio?.text || '',
      displayName: user.display_name,
      followers: user.follower_count,
      following: user.following_count,
      casts: casts.length,
      replies,
      score,
      registeredAt: new Date(user.registered_at),
    };
  } catch (error) {
    console.error('Error fetching user from Neynar:', error);
    throw error;
  }
}
