import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const fileId = req.nextUrl.searchParams.get('id');
  if (!fileId) return new NextResponse('Missing file ID', { status: 400 });

  // Try multiple Google endpoints in order
  const urls = [
    `https://lh3.googleusercontent.com/d/${fileId}`,
    `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`,
    `https://drive.google.com/uc?export=view&id=${fileId}`,
  ];

  for (const url of urls) {
    try {
      const response = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
      });
      if (response.ok) {
        const buffer = await response.arrayBuffer();
        return new NextResponse(buffer, {
          headers: {
            'Content-Type': response.headers.get('content-type') || 'image/jpeg',
            'Cache-Control': 'public, max-age=86400',
          },
        });
      }
    } catch (error) {
      console.error(`Failed for ${url}:`, error);
    }
  }

  return new NextResponse('Image not accessible', { status: 404 });
}