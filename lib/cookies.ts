/** token parsing in the cookie */
export const cookieParser = (cookie: string | undefined) => {
  const cookies = cookie?.split('; ');

  const accessToken = cookies?.[0].split('access_token=')[1] ?? null;
  const refreshToken = cookies?.[1].split('refresh_token=')[1] ?? null;

  return {
    accessToken,
    refreshToken,
  };
};
