export type CookieParserToken = { [key in 'access_token' | 'refresh_token']: string | null };

/** token parsing in the cookie */
export const cookieParser = (cookie: string | undefined): CookieParserToken => {
  const cookies = cookie?.split('; ');

  if (cookies) {
    const token: CookieParserToken = Object.fromEntries(cookies.map((value) => value.split('=')));

    return { access_token: token.access_token ?? null, refresh_token: token.refresh_token ?? null };
  } else {
    return { access_token: null, refresh_token: null };
  }
};
