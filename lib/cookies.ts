import type { NextApiResponse } from 'next';

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

interface LoginPayload {
  type: 'login';
  accessToken: string;
  refreshToken: string;
}

interface LogoutPayload {
  type: 'logout';
}

interface MePayload {
  type: 'me';
  accessToken: string;
}

type SetCookiePayload = { res: NextApiResponse } & (LoginPayload | LogoutPayload | MePayload);

export const setCookies = (payload: SetCookiePayload) => {
  if (payload.type === 'login') {
    return payload.res.setHeader('Set-Cookie', [
      `access_token=${payload.accessToken}; httpOnly; path=/; secure; expires=${new Date(
        Date.now() + 1000 * 60 * 60,
      ).toUTCString()};`,
      `refresh_token=${payload.refreshToken}; httpOnly; path=/; secure; expires=${new Date(
        Date.now() + 1000 * 60 * 60 * 24 * 7,
      ).toUTCString()};`,
    ]);
  } else if (payload.type === 'logout') {
    return payload.res.setHeader('Set-Cookie', [
      `access_token=; path=/; expires=-1;`,
      `refresh_token=; path=/; expires=-1;`,
    ]);
  } else if (payload.type === 'me') {
    return payload.res.setHeader('Set-Cookie', [
      `access_token=${payload.accessToken}; httpOnly; path=/; secure; expires=${new Date(
        Date.now() + 1000 * 60 * 60,
      ).toUTCString()};`,
    ]);
  }
};
