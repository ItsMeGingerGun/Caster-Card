import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
}

export async function GET(req: Request) {
  return NextResponse.json([]);
}

export async function DELETE(req: Request) {
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
}
