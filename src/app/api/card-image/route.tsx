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
        <div style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor: '#1f2937',
          color: '#ffffff',
          padding: '40px',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '4px solid #8b5cf6',
            borderRadius: '24px',
            padding: '32px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
              <img 
                src={userData.pfpUrl} 
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '50%',
                  border: '4px solid #8b5cf6',
                  marginRight: '20px'
                }} 
                alt="Profile"
              />
              <div>
                <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>@{userData.username}</h1>
                <p style={{ fontSize: '18px', opacity: 0.8, maxWidth: '400px' }}>
                  {userData.bio || 'Farcaster user'}
                </p>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-around',
              marginTop: '24px'
            }}>
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', fontSize: '24px', marginBottom: '4px' }}>
        <span style={{ marginRight: '4px' }}>{icon}</span>
        <span style={{ fontWeight: 'bold' }}>{value}</span>
      </div>
      <span style={{ opacity: 0.8, fontSize: '14px' }}>{label}</span>
    </div>
  );
}
