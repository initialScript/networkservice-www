import { type NextRequest, NextResponse } from 'next/server';

const protectedPaths = ['/compte', '/checkout'];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedPaths.some((p) =>
    pathname.startsWith(p)
  );

  if (isProtected) {
    const token = request.cookies.get('accessToken')?.value;

    if (!token) {
      return NextResponse.redirect(
        new URL('/auth/login', request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};