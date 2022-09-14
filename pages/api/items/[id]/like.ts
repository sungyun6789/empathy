import prisma from '~/lib/prisma';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      if (req.query.id && typeof req.query.id === 'string' && req.cookies.access_token) {
        const item = await prisma.item.findUnique({
          where: {
            id: +req.query.id,
          },
        });

        if (item) {
          await prisma.item.update({
            where: {
              id: item.id,
            },
            data: {
              like: item.like + 1,
            },
          });
        }
      }
      return res.status(200).json(undefined);
    }
  } catch {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
