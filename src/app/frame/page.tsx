import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fid = searchParams.get('fid');

    if (!fid) {
      return new ImageResponse(
        (
          <div style={{
            background: 'linear-gradient(to bottom, #1f2937, #111827)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            padding: 20,
            textAlign: 'center'
          }}>
            <h1 style={{ fontSize: 48, marginBottom: 20 }}>Caster Card</h1>
            <p style={{ fontSize: 24 }}>Create your Farcaster stats card</p>
          </div>
        ),
        { width: 800, height: 400 }
      );
    }

    // Fetch user data from your API
    const userData = await fetch(`https://your-vercel-app.vercel.app/api/user?fid=${fid}`).then(res => res.json());

    return new ImageResponse(
      (
        <div style={{
          background: 'linear-gradient(to bottom, #1f2937, #111827)',
          width: '100%',
          height: '100%',
          display: 'flex',
          padding: 40,
          color: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src={userData.pfpUrl} 
              alt="Profile" 
              width={120} 
              height={120} 
              style={{ borderRadius: '50%', marginRight: 30 }} 
            />
            <div>
              <h1 style={{ fontSize: 36, marginBottom: 10 }}>@{userData.username}</h1>
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
          <div style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            fontSize: 18,
            color: '#a78bfa'
          }}>
            castercard.xyz
          </div>
        </div>
      ),
      { width: 800, height: 400 }
    );
  } catch (e) {
    console.error(e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
