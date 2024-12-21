import { Response } from 'express';

import { DeliveryParams } from '@/delivery/types';
import { AuthRequest } from '@/delivery/http/v1/handlers/types';

type Params = Pick<DeliveryParams, 'user'>;
export type Get = (req: AuthRequest, res: Response) => Promise<void>;
export const buildGet = ({ user: { avatar } }: Params): Get => {
  return async (req, res) => {
    const userId = req.user!.id;
    const avatarPath = await avatar.get({ userId });

    return res.status(200).sendFile(avatarPath);
  };
};
