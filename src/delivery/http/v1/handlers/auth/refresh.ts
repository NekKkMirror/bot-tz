import { Response } from 'express';

import { DeliveryParams } from '@/delivery/types';

import { AuthRequest } from '../types';

type Params = Pick<DeliveryParams, 'auth'>;
export type Refresh = (req: AuthRequest, res: Response) => Promise<Response>;
export const buildRefresh = ({ auth }: Params): Refresh => {
  return async (req, res) => {
    const result = await auth.refresh({
      refreshToken: req.body.refreshToken,
    });
    return res.status(200).json(result);
  };
};
