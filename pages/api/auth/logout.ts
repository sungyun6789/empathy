import { setCookies } from '~/lib/cookies';
import prisma from '~/lib/prisma';
import { validateToken } from '~/lib/tokens';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.cookies.access_token) {
      const decoded = await validateToken(req.cookies.access_token);

      const token = await prisma.token.findUnique({
        where: {
          id: decoded.tokenId,
        },
      });

      await prisma.token.delete({
        where: {
          id: token?.id,
        },
      });
    }
    setCookies({ res, type: 'logout' });
    return res.status(200).json(undefined);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
