import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { getUserStats } from '@/app/lib/neynarClient';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const fid = req.nextUrl.searchParams.get('fid');
  
  if (!fid) {
    return new Response('Missing fid parameter', { status: 400 });
  }

  try {
    const userData = await getUserStats(Number(fid));
    
    return new ImageResponse(
      (
        <div tw="flex w-full h-full bg-gray-900 text-white p-10">
          <div tw="flex flex-col w-full h-full items-center justify-center border-4 border-purple-600 rounded-3xl p-8">
            <div tw="flex items-center mb-8">
              <img 
                src={userData.pfpUrl} 
                tw="w-24 h-24 rounded-full mr-6 border-4 border-indigo-500" 
                alt="Profile"
              />
              <div tw="flex flex-col">
                <h1 tw="text-4xl font-bold">@{userData.username}</h1>
                <p tw="text-xl text-gray-300 mt-2 max-w-md">{userData.bio || 'Farcaster user'}</p>
              </div>
            </div>
            
            <div tw="flex w-full justify-around mt-8">
              <StatItem icon="✍️" value={userData.casts} label="Casts" />
              <StatItem icon="💬" value={userData.replies} label="Replies" />
              <StatItem icon="👥" value={userData.followers} label="Followers" />
              <StatItem icon="⭐" value={userData.score} label="Score" />
            </div>
          </div>
        </div>
      ),
      {
        width: 800,
        height: 400,
        headers: {
          'Cache-Control': 'public, max-age=1800, stale-while-revalidate=3600'
        }
      }
    );
  } catch (error) {
    console.error('OG Image Error:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}

function StatItem({ icon, value, label }: { icon: string; value: number; label: string }) {
  return (
    <div tw="flex flex-col items-center">
      <div tw="flex items-center text-3xl mb-2">
        <span tw="mr-2">{icon}</span>
        <span tw="font-bold">{value}</span>
      </div>
      <span tw="text-gray-400">{label}</span>
    </div>
  );
}
