import { ImageResponse } from 'next/og';
import { getUserStats } from '@/app/lib/neynarClient';
import React from 'react';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fid = searchParams.get('fid');

    if (!fid) {
      return new ImageResponse(
        React.createElement('div', {
          style: {
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
          },
          children: [
            React.createElement('h1', {
              style: { fontSize: 48, marginBottom: 20 },
              children: 'Caster Card'
            }),
            React.createElement('p', {
              style: { fontSize: 24 },
              children: 'Create your Farcaster stats card'
            })
          ]
        }),
        { width: 800, height: 400 }
      );
    }

    const userData = await getUserStats(parseInt(fid));

    return new ImageResponse(
      React.createElement('div', {
        style: {
          background: 'linear-gradient(to bottom, #1f2937, #111827)',
          width: '100%',
          height: '100%',
          display: 'flex',
          padding: '40px',
          color: 'white',
          position: 'relative'
        },
        children: [
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center' },
            children: [
              React.createElement('img', {
                src: userData.pfpUrl,
                alt: 'Profile',
                width: 120,
                height: 120,
                style: { borderRadius: '50%', marginRight: 30 }
              }),
              React.createElement('div', {
                children: [
                  React.createElement('h1', {
                    style: { fontSize: 36, marginBottom: 10 },
                    children: `@${userData.username}`
                  }),
                  React.createElement('p', {
                    style: { fontSize: 24, marginBottom: 20, opacity: 0.8 },
                    children: userData.displayName
                  }),
                  React.createElement('div', {
                    style: { display: 'flex', gap: 20, marginTop: 20 },
                    children: [
                      createStatElement('Casts', userData.casts),
                      createStatElement('Followers', userData.followers),
                      createStatElement('Score', userData.score)
                    ]
                  })
                ]
              })
            ]
          }),
          React.createElement('div', {
            style: {
              position: 'absolute',
              bottom: 20,
              right: 20,
              fontSize: 18,
              color: '#a78bfa'
            },
            children: 'castercard.xyz'
          })
        ]
      }),
      { width: 800, height: 400 }
    );
  } catch (e) {
    console.error(e);
    return new Response('Failed to generate image', { status: 500 });
  }
}

// Helper function to create stat elements
function createStatElement(label: string, value: number) {
  return React.createElement('div', {
    style: { textAlign: 'center' },
    children: [
      React.createElement('p', {
        style: { fontSize: 24, fontWeight: 'bold' },
        children: value.toString()
      }),
      React.createElement('p', {
        style: { fontSize: 18 },
        children: label
      })
    ]
  });
}
