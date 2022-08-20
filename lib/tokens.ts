import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ?? 'DEV_JWT_SECRET';

interface TokenPayload {
  type: 'access_token' | 'refresh_token';
  username: string;
  password: string;
}

const TOKEN_EXPIRES = {
  access_token: '1h',
  refresh_token: '30d',
} as const;

export const generateToken = (payload: TokenPayload) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: TOKEN_EXPIRES[payload.type],
      },
      (error, token) => {
        return error || !token ? reject(error) : resolve(token);
      },
    );
  });
};
