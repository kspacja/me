import { NextRequest, NextResponse } from 'next/server';

export function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return new NextResponse('Missing url parameter', { status: 400 });
  }

  // Only allow redirects to YouTube and Tidal
  const allowed = ['youtube.com', 'youtu.be', 'tidal.com'];
  const isAllowed = allowed.some(domain => {
    try {
      return new URL(url).hostname.endsWith(domain);
    } catch {
      return false;
    }
  });

  if (!isAllowed) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  return NextResponse.redirect(url);
}
