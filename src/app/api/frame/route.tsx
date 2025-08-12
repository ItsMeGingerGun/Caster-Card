import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fid = searchParams.get('fid');

    if (!fid) {
      return new ImageResponse(
        (
          <div
            style={{
              background: 'linear-gradient(to bottom, #1f2937, #111827)',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              padding: '20px',
              textAlign: 'center'
            }}
          >
            <h1 style={{ fontSize: 48, marginBottom: 20 }}>Caster Card</h1>
            <p style={{ fontSize: 24 }}>Create your Farcaster stats card</p>
          </div>
        ),
        { width: 800, height: 400 }
      );
    }

    // Fetch user data from our Node.js API route
    const userDataRes = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/user?fid=${fid}`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (!userDataRes.ok) {
      console.error('Failed to fetch user data', await userDataRes.text());
      return new ImageResponse(
        (
          <div
            style={{
              background: 'linear-gradient(to bottom, #1f2937, #111827)',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              padding: '20px',
              textAlign: 'center'
            }}
          >
            <h1 style={{ fontSize: 48, marginBottom: 20 }}>Error</h1>
            <p style={{ fontSize: 24 }}>Failed to load user data</p>
          </div>
        ),
        { width: 800, height: 400 }
      );
    }

    const userData = await userDataRes.json();

    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(to bottom, #1f2937, #111827)',
            width: '100%',
            height: '100%',
            display: 'flex',
            padding: '40px',
            color: 'white',
            position: 'relative'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={userData.pfpUrl}
              alt="Profile"
              width={120}
              height={120}
              style={{ 
                borderRadius: '50%', 
                marginRight: 30,
                border: '2px solid #a78bfa'
              }}
            />
            <div>
              <h1 style={{ fontSize: 36, marginBottom: 10 }}>@{userData.username}</h1>
              <p style={{ fontSize: 24, marginBottom: 20, opacity: 0.8 }}>{userData.displayName}</p>
              <div style={{ display: 'flex', gap: 20, marginTop: 20 }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 24, fontWeight: 'bold' }}>{userData.casts}</p>
                  <p style={{ fontSize: 18 }}>Casts</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 24, fontWeight: 'bold' }}>{userData.followers}</p>
                  <p style={{ fontSize: 18 }}>Followers</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 24, fontWeight: 'bold' }}>{userData.score}</p>
                  <p style={{ fontSize: 18 }}>Score</p>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 20,
              right: 20,
              fontSize: 18,
              color: '#a78bfa',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ marginRight: 8 }}>
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#a78bfa" strokeWidth="2"/>
              <path d="M2 17L12 22L22 17" stroke="#a78bfa" strokeWidth="2"/>
              <path d="M2 12L12 17L22 12" stroke="#a78bfa" strokeWidth="2"/>
            </svg>
            castercard.xyz
          </div>
        </div>
      ),
      {
        width: 800,
        height: 400,
        fonts: [
          {
            name: 'Inter',
            data: await fetchFont('https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjg.woff'),
            style: 'normal',
            weight: 400,
          },
          {
            name: 'Inter',
            data: await fetchFont('https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjg.woff'),
            style: 'normal',
            weight: 700,
          },
        ],
      }
    );
  } catch (e) {
    console.error('Frame generation error:', e);
    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(to bottom, #1f2937, #111827)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            padding: '20px',
            textAlign: 'center'
          }}
        >
          <h1 style={{ fontSize: 48, marginBottom: 20 }}>Error</h1>
          <p style={{ fontSize: 24 }}>Failed to generate card</p>
        </div>
      ),
      { width: 800, height: 400 }
    );
  }
}

async function fetchFont(url: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Font fetch failed: ${res.status}`);
    return await res.arrayBuffer();
  } catch (error) {
    console.error('Error loading font:', error);
    // Return empty buffer as fallback
    return new ArrayBuffer(0);
  }
}
