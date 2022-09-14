import prisma from '~/lib/prisma';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (typeof req.query.id === 'string') {
      const item = await prisma.item.findUnique({
        where: {
          id: +req.query.id,
        },
      });

      if (req.method === 'POST' && item) {
        await prisma.item.update({
          where: {
            id: item.id,
          },
          data: {
            like: item.like + 1,
          },
        });

        return res.status(200).json(undefined);
      }
    }
  } catch {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
