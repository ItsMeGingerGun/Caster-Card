import { NextResponse } from 'next/server';

export async function GET() {
  // This endpoint doesn't need to do anything special
  // The Farcaster client handles the authentication flow
  // The AuthContext will automatically handle the user state
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/`);
}
