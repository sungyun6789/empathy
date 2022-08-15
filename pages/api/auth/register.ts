import bcrypt from 'bcrypt';

import prisma from '~/lib/prisma';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body;

  try {
    const exists = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (exists) {
      return res.status(400).json({ error: 'User already exists' });
    } else {
      await prisma.user.create({
        data: {
          username,
          password: await bcrypt.hash(password, 12),
        },
      });
      return res.status(200).json(undefined);
    }
  } catch {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
