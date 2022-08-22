import bcrypt from 'bcrypt';

import prisma from '~/lib/prisma';
import { generateToken } from '~/lib/tokens';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) {
        const token = await prisma.token.create({
          data: {
            userId: user.id,
          },
        });

        const tokenId = token.id;

        const [accessToken, refreshToken] = await Promise.all([
          generateToken({
            type: 'access_token',
            username,
            password,
            tokenId,
          }),
          generateToken({
            type: 'refresh_token',
            username,
            password,
            tokenId,
          }),
        ]);

        res.setHeader('Set-Cookie', [
          `access_token=${accessToken}; httpOnly; path=/; secure; expires=${new Date(
            Date.now() + 1000 * 60 * 60,
          ).toUTCString()};`,
          `refresh_token=${refreshToken}; httpOnly; path=/; secure; expires=${new Date(
            Date.now() + 1000 * 60 * 60 * 24 * 7,
          ).toUTCString()};`,
        ]);

        return res.status(200).json(user);
      } else {
        return res.status(400).json({ error: 'Password do not match' });
      }
    } else {
      return res.status(400).json({ error: 'User not found' });
    }
  } catch {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
