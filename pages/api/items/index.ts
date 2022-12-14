import prisma from '~/lib/prisma';
import { validateToken } from '~/lib/tokens';
import { videoIdParser } from '~/lib/video';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const items = await prisma.item.findMany({
        select: {
          id: true,
          description: true,
          videoId: true,
          itemLikes: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      const data = items.map((item) => ({ ...item, itemLikes: item.itemLikes.length }));

      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      if (req.cookies.access_token) {
        const { username } = await validateToken(req.cookies.access_token);

        const user = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        if (user) {
          const { description, url } = req.body;
          const videoId = videoIdParser(url);
          if (!videoId) {
            return res.status(400).json({ error: '유튜브 주소가 아닙니다.' });
          }

          const newItem = await prisma.item.create({
            data: {
              userId: user.id,
              url,
              description,
              videoId,
            },
          });

          return res.status(200).json({ id: newItem.id });
        }
      }
    }
  } catch {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
