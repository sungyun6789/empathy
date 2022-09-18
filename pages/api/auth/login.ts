import bcrypt from 'bcrypt';

import { setCookies } from '~/lib/cookies';
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
        setCookies({ res, type: 'login', accessToken, refreshToken });
        return res.status(200).json(user);
      } else {
        return res.status(400).json({ error: '비밀번호가 틀렸습니다.' });
      }
    } else {
      return res.status(400).json({ error: '존재하지 않는 유저입니다.' });
    }
  } catch {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
