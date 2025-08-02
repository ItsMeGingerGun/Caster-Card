import { NeynarAPIClient } from '@neynar/nodejs-sdk';

export async function getUserStats(fid: number) {
  try {
    const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY!);
    const user = await client.lookupUserByFid(fid);
    
    return {
      fid: user.result.user.fid,
      username: user.result.user.username,
      pfpUrl: user.result.user.pfp_url,
      bio: user.result.user.profile.bio.text,
      displayName: user.result.user.display_name,
      followers: user.result.user.follower_count,
      following: user.result.user.following_count,
      casts: 0, // Placeholder
      replies: 0, // Placeholder
      score: 0, // Placeholder
      registeredAt: new Date(),
    };
  } catch (error) {
    console.error('Error fetching user from Neynar:', error);
    throw error;
  }
}
