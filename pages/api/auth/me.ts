import { setCookies } from '~/lib/cookies';
import { generateToken, validateToken } from '~/lib/tokens';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.cookies.access_token) {
      const decoded = await validateToken(req.cookies.access_token);

      const { username, password } = decoded;

      return res.status(200).json({ username, password });
    } else {
      if (req.cookies.refresh_token) {
        const { username, password, tokenId } = await validateToken(req.cookies.refresh_token);
        const accessToken = await generateToken({ type: 'access_token', username, password, tokenId });
        setCookies({ res, type: 'me', accessToken });
        return res.status(200).json({ username, password });
      } else {
        return res.status(200).json(undefined);
      }
    }
  } catch {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
