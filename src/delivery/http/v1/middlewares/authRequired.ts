import Express from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';

import { verifyJWT } from '@/lib';
import { AuthRequest } from '@/delivery/http/v1/handlers/types';

export const authRequired =
  ({ required = true } = {}): Express.RequestHandler =>
  async (req: AuthRequest, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (required && !token) {
      res.status(httpStatus.UNAUTHORIZED).json({
        error: {
          message: 'UNAUTHORIZED',
        },
      });

      return;
    }

    const tokenPayload = token ? (verifyJWT(token) as JwtPayload & { id: string }) : null;

    if (required && !tokenPayload?.id) {
      res.status(httpStatus.UNAUTHORIZED).json({
        error: {
          message: 'UNAUTHORIZED',
        },
      });

      return;
    }

    req.user = {
      id: tokenPayload!.id,
    };
    next();
  };
