import prisma from '~/lib/prisma';

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
        return res.status(200).json({ ...item, likes });
      }
    }
  } catch {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
