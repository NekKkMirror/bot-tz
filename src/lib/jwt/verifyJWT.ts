import jwt, { JwtPayload } from 'jsonwebtoken';

import { config } from '@/config';

export const verifyJWT = (token: string): JwtPayload | string => {
  try {
    return jwt.verify(token, config.jwt.secret);
  } catch (e) {
    return {
      id: null,
    };
  }
};
