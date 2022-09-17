import prisma from '~/lib/prisma';
import { validateToken } from '~/lib/tokens';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (typeof req.query.id === 'string' && req.cookies.access_token) {
      const item = await prisma.item.findUnique({
        where: {
          id: +req.query.id,
        },
      });

      const { username } = await validateToken(req.cookies.access_token);

      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (req.method === 'POST' && item && user) {
        const alreadyLike = await prisma.itemLike.findUnique({
          where: {
            itemId_userId: {
              itemId: item.id,
              userId: user.id,
            },
          },
        });
        if (!alreadyLike) {
          await prisma.itemLike.create({
            data: {
              userId: user.id,
              itemId: item.id,
            },
          });

          const count = await prisma.itemLike.count({
            where: {
              itemId: item.id,
            },
          });

          return res.status(200).json({ count });
        } else {
          /** TODO: 좋아요 취소 */
          return res.status(400).json(undefined);
        }
      }
    }
  } catch {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
