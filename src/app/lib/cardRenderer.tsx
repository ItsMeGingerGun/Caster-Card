import { ImageResponse } from '@vercel/og';

export async function generateCardImage(userData: any, themeConfig: any) {
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
        ]
      }
    );
  } catch (error) {
    console.error('Card generation error:', error);
    throw new Error('Failed to generate card image');
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
