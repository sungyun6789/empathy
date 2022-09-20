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
        const userId = user.id;
        const itemId = item.id;

        const alreadyLike = await prisma.itemLike.findUnique({
          where: {
            itemId_userId: {
              itemId,
              userId,
            },
          },
        });

        if (!alreadyLike) {
          await prisma.itemLike.create({
            data: {
              userId,
              itemId,
            },
          });
        } else {
          await prisma.itemLike.delete({
            where: {
              itemId_userId: {
                itemId,
                userId,
              },
            },
          });
        }

        const count = await prisma.itemLike.count({
          where: {
            itemId,
          },
        });

        return res.status(200).json({ count });
      }
    } else {
      return res.status(400).json({ error: '해당 기능은 로그인 후에 사용할 수 있습니다.' });
    }
  } catch {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
