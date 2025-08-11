import { NeynarAPIClient } from '@neynar/nodejs-sdk';

export async function getUserStats(fid: number) {
  try {
    const client = new NeynarAPIClient({
      apiKey: process.env.NEYNAR_API_KEY!,
    });
    
    const userResponse = await client.fetchBulkUsers({
      fids: [fid],
      viewerFid: fid
    });
    
    if (!userResponse.users || userResponse.users.length === 0) {
      throw new Error('User not found');
    }
    
    const user = userResponse.users[0];
    
    // Get user's casts
    const castsResponse = await client.fetchCastsForUser({
      fid,
      limit: 100,
      includeReplies: true
    });
    
    const casts = castsResponse.result.casts;
    const replies = casts.filter(cast => cast.parentHash).length;
    
    // Calculate score
    const score = Math.min(
      100, 
      Math.floor(
        user.followerCount * 0.4 +
        casts.length * 0.3 +
        replies * 0.2 +
        user.followingCount * 0.1
      )
    );

    return {
      fid: user.fid,
      username: user.username,
      displayName: user.displayName,
      pfpUrl: user.pfp.url,
      bio: user.profile.bio?.text || '',
      followers: user.followerCount,
      following: user.followingCount,
      casts: casts.length,
      replies,
      score
    };
  } catch (error) {
    console.error('Error fetching user from Neynar:', error);
    throw error;
  }
}
