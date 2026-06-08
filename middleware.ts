import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';

const locales = ['fr', 'ar'] as const;
type Locale = (typeof locales)[number];
const defaultLocale: Locale = 'fr';

const protectedPaths = ['/compte', '/checkout'];

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const detectedLocale = locales.find(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  );

  if (detectedLocale) {
    const pathWithoutLocale = pathname.slice(detectedLocale.length + 1) || '/';
    const isProtected = protectedPaths.some((p) => pathWithoutLocale.startsWith(p));

    if (isProtected) {
      const token = request.cookies.get('accessToken')?.value;
      if (!token) {
        return NextResponse.redirect(
          new URL(`/${detectedLocale}/auth/login`, request.url)
        );
      }
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
