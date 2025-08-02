import { NeynarAPIClient } from '@neynar/nodejs-sdk';

export async function getUserStats(fid: number) {
  try {
    const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY!);
    const user = await client.lookupUserByFid(fid);
    
    // Fetch user's casts
    const castsResponse = await client.fetchUserCasts(fid, { limit: 100 });
    const casts = castsResponse.result.casts;
    const replies = casts.filter(cast => cast.parent_hash).length;
    
    // Calculate score
    const score = Math.min(100, Math.floor(
      (user.result.user.follower_count * 0.4) +
      (casts.length * 0.3) +
      (replies * 0.2) +
      (user.result.user.following_count * 0.1)
    ));

    return {
      fid: user.result.user.fid,
      username: user.result.user.username,
      pfpUrl: user.result.user.pfp_url,
      bio: user.result.user.profile.bio.text,
      displayName: user.result.user.display_name,
      followers: user.result.user.follower_count,
      following: user.result.user.following_count,
      casts: casts.length,
      replies,
      score,
      registeredAt: new Date(user.result.user.registered_at),
    };
  } catch (error) {
    console.error('Error fetching user from Neynar:', error);
    throw error;
  }
}
