import { Response } from 'express';

import { DeliveryParams } from '@/delivery/types';
import { AuthRequest } from '@/delivery/http/v1/handlers/types';

type Params = Pick<DeliveryParams, 'user'>;
export type Delete = (req: AuthRequest, res: Response) => Promise<Response>;
export const buildDelete = ({ user: { avatar } }: Params): Delete => {
  return async (req, res) => {
    const userId = req.user!.id;

    await avatar.delete({ userId });

    return res.status(204).send();
  };
};
