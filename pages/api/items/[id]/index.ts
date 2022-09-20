import prisma from '~/lib/prisma';
import { validateToken } from '~/lib/tokens';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      if (req.query.id && typeof req.query.id === 'string') {
        const item = await prisma.item.findUnique({
          where: {
            id: +req.query.id,
          },
        });
        const likes = await prisma.itemLike.count({
          where: {
            itemId: item?.id,
          },
        });

        if (!req.cookies.access_token) {
          return res.status(200).json({ ...item, likes, alreadyLike: false });
        }

        const { username } = await validateToken(req.cookies.access_token);

        const user = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        if (!(item && user)) {
          return res.status(200).json({ ...item, likes, alreadyLike: false });
        }

        const alreadyLike = await prisma.itemLike.findUnique({
          where: {
            itemId_userId: {
              itemId: item.id,
              userId: user.id,
            },
          },
        });

        return res.status(200).json({ ...item, likes, alreadyLike: !!alreadyLike });
      }
    }
  } catch {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
