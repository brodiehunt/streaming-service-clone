import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const pathname = request.nextUrl.pathname

  // Exclude irrelevant paths (e.g., static files, images, favicon)
  if (
    pathname.startsWith('/_next/') || // Skip Next.js internals
    pathname === '/favicon.ico' || // Skip favicon
    pathname === '/robots.txt' || // Skip robots.txt
    pathname === '/sitemap.xml' // Skip sitemap
  ) {
    return NextResponse.next()
  }

  if (request.nextUrl.pathname === '/shows') {
    return NextResponse.redirect(new URL('/genres', request.url))
  }

  if (request.method === 'GET') {
    const response = NextResponse.next()
    const token = request.cookies.get('session')?.value ?? null

    if (token !== null) {
      response.cookies.set('session', token, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
        sameSite: 'lax',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })
    }

    return response
  }

  return NextResponse.next()
}
