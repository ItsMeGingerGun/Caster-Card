import { ImageResponse } from 'next/og';
import { getUserStats } from '@/app/lib/neynarClient';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fid = searchParams.get('fid');

    if (!fid) {
      return new ImageResponse(
        (
          // Using a template literal to avoid JSX syntax
          `<div style="background: linear-gradient(to bottom, #1f2937, #111827); width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; color: white; padding: 20px; text-align: center;">
            <h1 style="font-size: 48px; margin-bottom: 20px;">Caster Card</h1>
            <p style="font-size: 24px;">Create your Farcaster stats card</p>
          </div>`
        ),
        { width: 800, height: 400 }
      );
    }

    const userData = await getUserStats(parseInt(fid));

    return new ImageResponse(
      (
        // Using a template literal to avoid JSX syntax
        `<div style="background: linear-gradient(to bottom, #1f2937, #111827); width: 100%; height: 100%; display: flex; padding: 40px; color: white;">
          <div style="display: flex; align-items: center;">
            <img 
              src="${userData.pfpUrl}" 
              alt="Profile" 
              width="120"
              height="120"
              style="border-radius: 50%; margin-right: 30px;" 
            />
            <div>
              <h1 style="font-size: 36px; margin-bottom: 10px;">@${userData.username}</h1>
              <p style="font-size: 24px; margin-bottom: 20px; opacity: 0.8;">${userData.displayName}</p>
              <div style="display: flex; gap: 20px; margin-top: 20px;">
                <div style="text-align: center;">
                  <p style="font-size: 24px; font-weight: bold;">${userData.casts}</p>
                  <p style="font-size: 18px;">Casts</p>
                </div>
                <div style="text-align: center;">
                  <p style="font-size: 24px; font-weight: bold;">${userData.followers}</p>
                  <p style="font-size: 18px;">Followers</p>
                </div>
                <div style="text-align: center;">
                  <p style="font-size: 24px; font-weight: bold;">${userData.score}</p>
                  <p style="font-size: 18px;">Score</p>
                </div>
              </div>
            </div>
          </div>
          <div style="position: absolute; bottom: 20px; right: 20px; font-size: 18px; color: #a78bfa;">
            castercard.xyz
          </div>
        </div>`
      ),
      { width: 800, height: 400 }
    );
  } catch (e) {
    console.error(e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
