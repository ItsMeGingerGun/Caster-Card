import { NeynarAPIClient } from '@neynar/nodejs-sdk';

export async function getUserStats(fid: number) {
  try {
    const client = new NeynarAPIClient({
      apiKey: process.env.NEYNAR_API_KEY!,
    });
    
    // V2: Use object parameter instead of multiple arguments
    const userResponse = await client.fetchBulkUsers({
      fids: [fid],
      viewerFid: fid
    });
    
    if (!userResponse.users || userResponse.users.length === 0) {
      throw new Error('User not found');
    }
    
    const user = userResponse.users[0];
    
    // V2: Use object parameter with named properties
    const castsResponse = await client.fetchCastsForUser({
      fid,
      limit: 100,
      includeReplies: true
    });
    
    // V2: Access casts directly from response
    const casts = castsResponse.casts;
    const replies = casts.filter(cast => cast.parent_hash).length;
    
    // Calculate score
    const score = Math.min(
      100, 
      Math.floor(
        user.follower_count * 0.4 +
        casts.length * 0.3 +
        replies * 0.2 +
        user.following_count * 0.1
      )
    );

    return {
      fid: user.fid,
      username: user.username,
      displayName: user.display_name,
      pfpUrl: user.pfp_url,
      bio: user.profile.bio?.text || '',
      followers: user.follower_count,
      following: user.following_count,
      casts: casts.length,
      replies,
      score
    };
  } catch (error) {
    console.error('Error fetching user from Neynar:', error);
    throw error;
  }
}
