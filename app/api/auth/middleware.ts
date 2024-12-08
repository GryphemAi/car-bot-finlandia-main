import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || req.ip || 'unknown';
  console.log('IP do usuário:', ip);
  return NextResponse.next();
}

export const config = {
  matcher: '/api/auth/:path*',
};
