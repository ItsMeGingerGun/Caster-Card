import { getUserStats } from '@/app/lib/neynarClient';
import { createCanvas, loadImage } from 'canvas';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fid = searchParams.get('fid');
    
    const width = 800;
    const height = 400;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#1f2937');
    gradient.addColorStop(1, '#111827');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    if (!fid) {
      // Default card when no FID is provided
      ctx.fillStyle = 'white';
      ctx.font = 'bold 48px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Caster Card', width / 2, height / 2 - 30);
      ctx.font = '24px sans-serif';
      ctx.fillText('Create your Farcaster stats card', width / 2, height / 2 + 30);
    } else {
      // Generate card with user stats
      const userData = await getUserStats(parseInt(fid));
      
      // Draw profile picture
      try {
        const pfp = await loadImage(userData.pfpUrl);
        // Draw as circle
        ctx.save();
        ctx.beginPath();
        ctx.arc(100, 100, 60, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(pfp, 40, 40, 120, 120);
        ctx.restore();
      } catch (error) {
        console.error('Error loading profile image:', error);
        // Fallback: draw placeholder
        ctx.fillStyle = '#9CA3AF';
        ctx.beginPath();
        ctx.arc(100, 100, 60, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Draw username and display name
      ctx.fillStyle = 'white';
      ctx.font = 'bold 36px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`@${userData.username}`, 200, 80);
      
      ctx.font = '24px sans-serif';
      ctx.fillText(userData.displayName, 200, 120);
      
      // Draw stats
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText(`Casts: ${userData.casts}`, 200, 180);
      ctx.fillText(`Replies: ${userData.replies}`, 200, 220);
      ctx.fillText(`Followers: ${userData.followers}`, 200, 260);
      ctx.fillText(`Score: ${userData.score}`, 200, 300);
      
      // Draw footer
      ctx.font = '18px sans-serif';
      ctx.fillStyle = '#a78bfa';
      ctx.textAlign = 'right';
      ctx.fillText('castercard.xyz', width - 20, height - 20);
    }
    
    // Convert to PNG buffer
    const buffer = canvas.toBuffer('image/png');
    
    return new Response(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=600'
      }
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Failed to generate image' }, 
      { status: 500 }
    );
  }
}
