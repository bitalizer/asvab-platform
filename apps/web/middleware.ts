import { type NextRequest, NextResponse } from 'next/server';

const PROTECTED_PREFIXES = [
  '/dashboard',
  '/practice',
  '/mock-exam',
  '/progress',
  '/learn',
  '/flashcards',
  '/mistakes',
  '/bookmarks',
  '/question-bank',
  '/study-plan',
  '/achievements',
  '/notifications',
  '/settings',
  '/profile',
  '/onboarding',
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
  if (!isProtected) return NextResponse.next();

  // Better Auth session cookie. The exact name in production may have a __Secure- prefix.
  const sessionCookie = req.cookies.get('better-auth.session_token');
  if (!sessionCookie) {
    const url = new URL('/login', req.url);
    if (pathname !== '/dashboard') {
      url.searchParams.set('next', pathname);
    }
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};
