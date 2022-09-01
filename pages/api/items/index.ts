import prisma from '~/lib/prisma';
import { validateToken } from '~/lib/tokens';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const items = await prisma.item.findMany();
      return res.status(200).json(items);
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
          const videoId = url;

          await prisma.item.create({
            data: {
              userId: user.id,
              url,
              description,
              videoId,
            },
          });
          // TODO: 글 생성 후 글 상세 페이지로 리다이렉트 할 수 있도록 필요한 데이터 넘기기
          return res.status(200).json(undefined);
        }
      }
    }
  } catch {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
