import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ?? 'DEV_JWT_SECRET';

interface TokenPayload {
  type: 'access_token' | 'refresh_token';
  username: string;
  password: string;
  tokenId: number;
}

interface DecodedToken extends TokenPayload {
  iat: number;
  exp: number;
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

export const validateToken = (token: string) => {
  return new Promise<DecodedToken>((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (error, decoded) => {
      return error ? reject(error) : resolve(decoded as DecodedToken);
    });
  });
};
