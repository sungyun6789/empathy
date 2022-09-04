import { NextResponse } from 'next/server';

import type { NextMiddleware } from 'next/server';

export const middleware: NextMiddleware = async (request) => {
  const accessToken = request.cookies.get('access_token');
  const refreshToken = request.cookies.get('refresh_token');

  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(`${request.nextUrl.origin}/auth/login`);
  } else {
    return NextResponse.next();
  }
};

/** 아래 설정한 경로에서만 실행 */
export const config = {
  matcher: ['/write'],
};
