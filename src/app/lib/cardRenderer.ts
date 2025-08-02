import { createCanvas, loadImage } from 'canvas';
import path from 'path';
import { getRedisClient } from './redis';

// Register fonts
registerFont(path.resolve('./public/fonts/Inter-Bold.ttf'), { family: 'Inter', weight: 'bold' });
registerFont(path.resolve('./public/fonts/Inter-Regular.ttf'), { family: 'Inter' });

export async function generateCardImage(userData: any, themeConfig: any = {}) {
  const width = 600;
  const height = 300;
  
  // Check Redis cache
  const redis = getRedisClient();
  const cacheKey = `card:${userData.fid}:${JSON.stringify(themeConfig)}`;
  const cachedImage = await redis.getBuffer(cacheKey);
  
  if (cachedImage) {
    return cachedImage;
  }
  
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Apply theme
  const bgColor = themeConfig.backgroundColor || '#1f2937';
  const textColor = themeConfig.textColor || '#ffffff';
  const accentColor = themeConfig.accentColor || '#8b5cf6';

  // Draw background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  try {
    // Draw profile picture
    const pfp = await loadImage(userData.pfpUrl);
    const pfpSize = 80;
    ctx.save();
    ctx.beginPath();
    ctx.arc(40 + pfpSize/2, 40 + pfpSize/2, pfpSize/2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(pfp, 40, 40, pfpSize, pfpSize);
    ctx.restore();
  } catch (error) {
    console.error('Error loading profile image:', error);
    // Fallback avatar
    ctx.fillStyle = accentColor;
    ctx.beginPath();
    ctx.arc(80, 80, 40, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw username
  ctx.fillStyle = textColor;
  ctx.font = 'bold 24px "Inter"';
  ctx.fillText(`@${userData.username}`, 140, 60);

  // Draw bio
  ctx.fillStyle = '#d1d5db';
  ctx.font = '16px "Inter"';
  wrapText(ctx, userData.bio || '', 140, 90, width - 160, 20);

  // Draw stats
  const stats = [
    { icon: '✍️', value: userData.casts, label: 'Casts' },
    { icon: '💬', value: userData.replies, label: 'Replies' },
    { icon: '👥', value: userData.followers, label: 'Followers' },
    { icon: '⭐', value: userData.score, label: 'Score' },
  ];

  const startY = 150;
  stats.forEach((stat, index) => {
    const x = 40 + (index % 2) * 280;
    const y = startY + Math.floor(index / 2) * 70;
    
    ctx.fillStyle = textColor;
    ctx.font = 'bold 20px "Inter"';
    ctx.fillText(`${stat.icon} ${stat.value}`, x, y);
    
    ctx.fillStyle = '#9ca3af';
    ctx.font = '14px "Inter"';
    ctx.fillText(stat.label, x, y + 25);
  });

  // Draw accent border
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 4;
  ctx.strokeRect(10, 10, width - 20, height - 20);

  // Generate image buffer
  const imageBuffer = canvas.toBuffer('image/png');
  
  // Cache in Redis for 30 minutes
  await redis.setex(cacheKey, 1800, imageBuffer);
  
  return imageBuffer;
}

function wrapText(ctx: any, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(' ');
  let line = '';
  let testLine;
  let metrics;

  for (let n = 0; n < words.length; n++) {
    testLine = line + words[n] + ' ';
    metrics = ctx.measureText(testLine);
    
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}
