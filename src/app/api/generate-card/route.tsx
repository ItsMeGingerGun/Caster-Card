import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { getUserStats } from '@/app/lib/neynarClient';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const { userData, themeConfig } = await req.json();
  
  // Add validation
  if (!userData || !themeConfig) {
    return new Response('Invalid request body', { status: 400 });
  }
  
  try {
    return new ImageResponse(
      (
        <div style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor: themeConfig.backgroundColor,
          color: themeConfig.textColor,
          fontFamily: 'Inter, sans-serif',
          padding: '40px',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            border: '8px solid',
            borderColor: themeConfig.accentColor,
            borderRadius: '24px',
            padding: '32px',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
              <img 
                src={userData.pfpUrl} 
                style={{ 
                  width: '96px', 
                  height: '96px', 
                  borderRadius: '50%',
                  border: `4px solid ${themeConfig.accentColor}`,
                  marginRight: '24px'
                }} 
              />
              <div>
                <h1 style={{ 
                  fontSize: '36px', 
                  fontWeight: 'bold',
                  marginBottom: '8px'
                }}>
                  @{userData.username}
                </h1>
                <p style={{ 
                  fontSize: '20px',
                  color: themeConfig.textColor,
                  opacity: 0.8,
                  maxWidth: '400px'
                }}>
                  {userData.bio || 'Farcaster user'}
                </p>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-around',
              marginTop: '32px'
            }}>
              <StatItem icon="✍️" value={userData.casts} label="Casts" color={themeConfig.textColor} />
              <StatItem icon="💬" value={userData.replies} label="Replies" color={themeConfig.textColor} />
              <StatItem icon="👥" value={userData.followers} label="Followers" color={themeConfig.textColor} />
              <StatItem icon="⭐" value={userData.score} label="Score" color={themeConfig.textColor} />
            </div>
          </div>
        </div>
      ),
      {
        width: 800,
        height: 400,
        fonts: [
          {
            name: 'Inter',
            data: await fetchFont(),
            style: 'normal'
          }
        ],
        headers: {
          'Cache-Control': 'public, max-age=1800, s-maxage=3600'
        }
      }
    );
  } catch (error) {
    console.error('Card generation error:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const fid = url.searchParams.get('fid');
  
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
            border: '8px solid #8b5cf6',
            borderRadius: '24px',
            padding: '32px',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
              <img 
                src={userData.pfpUrl} 
                style={{ 
                  width: '96px', 
                  height: '96px', 
                  borderRadius: '50%',
                  border: '4px solid #8b5cf6',
                  marginRight: '24px'
                }} 
              />
              <div>
                <h1 style={{ 
                  fontSize: '36px', 
                  fontWeight: 'bold',
                  marginBottom: '8px'
                }}>
                  @{userData.username}
                </h1>
                <p style={{ 
                  fontSize: '20px',
                  opacity: 0.8,
                  maxWidth: '400px'
                }}>
                  {userData.bio || 'Farcaster user'}
                </p>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-around',
              marginTop: '32px'
            }}>
              <StatItem icon="✍️" value={userData.casts} label="Casts" color="#ffffff" />
              <StatItem icon="💬" value={userData.replies} label="Replies" color="#ffffff" />
              <StatItem icon="👥" value={userData.followers} label="Followers" color="#ffffff" />
              <StatItem icon="⭐" value={userData.score} label="Score" color="#ffffff" />
            </div>
          </div>
        </div>
      ),
      {
        width: 800,
        height: 400,
        headers: {
          'Cache-Control': 'public, max-age=1800, s-maxage=3600'
        }
      }
    );
  } catch (error) {
    console.error('Card generation error:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}

function StatItem({ icon, value, label, color }: { 
  icon: string; 
  value: number; 
  label: string;
  color: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', fontSize: '28px', marginBottom: '8px' }}>
        <span style={{ marginRight: '8px' }}>{icon}</span>
        <span style={{ fontWeight: 'bold' }}>{value}</span>
      </div>
      <span style={{ color, opacity: 0.8, fontSize: '16px' }}>{label}</span>
    </div>
  );
}

async function fetchFont() {
  const response = await fetch('https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2');
  return await response.arrayBuffer();
}
