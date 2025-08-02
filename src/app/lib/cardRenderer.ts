import { ImageResponse } from '@vercel/og';

export async function generateCardImage(userData: any, themeConfig: any) {
  try {
    const response = new ImageResponse(
      (
        <div tw="flex w-full h-full" style={{
          backgroundColor: themeConfig.backgroundColor,
          color: themeConfig.textColor
        }}>
          <div tw="flex flex-col w-full h-full items-center justify-center border-8 rounded-3xl p-8"
               style={{ borderColor: themeConfig.accentColor }}>
            <div tw="flex items-center mb-8">
              <img 
                src={userData.pfpUrl} 
                tw="w-24 h-24 rounded-full mr-6 border-4" 
                style={{ borderColor: themeConfig.accentColor }}
                alt="Profile"
              />
              <div tw="flex flex-col">
                <h1 tw="text-4xl font-bold">@{userData.username}</h1>
                <p tw="text-xl mt-2 max-w-md" style={{ color: themeConfig.textColor }}>
                  {userData.bio || 'Farcaster user'}
                </p>
              </div>
            </div>
            
            <div tw="flex w-full justify-around mt-8">
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
        height: 400
      }
    );

    return await response.blob();
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
    <div tw="flex flex-col items-center">
      <div tw="flex items-center text-3xl mb-2">
        <span tw="mr-2">{icon}</span>
        <span tw="font-bold">{value}</span>
      </div>
      <span style={{ color }}>{label}</span>
    </div>
  );
}
