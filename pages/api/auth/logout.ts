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

      await prisma.token.update({
        where: {
          id: token?.id,
        },
        data: {
          blocked: true,
        },
      });
    }

    res.setHeader('Set-Cookie', [`access_token=; path=/; expires=-1;`, `refresh_token=; path=/; expires=-1;`]);

    return res.status(200).json(undefined);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
