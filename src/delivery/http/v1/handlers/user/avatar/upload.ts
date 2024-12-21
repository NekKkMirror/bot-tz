import { Response } from 'express';

import { DeliveryParams } from '@/delivery/types';
import { AuthRequest } from '@/delivery/http/v1/handlers/types';

type Params = Pick<DeliveryParams, 'user'>;
export type Upload = (req: AuthRequest, res: Response) => Promise<Response>;
export const buildUpload = ({ user: { avatar } }: Params): Upload => {
  return async (req, res) => {
    const userId = req.user!.id;
    const file = req.file;

    if (!file) {
      return res.status(400).send({ error: 'Avatar is required' });
    }

    const filePath = await avatar.upload({
      userId,
      file,
    });

    return res.status(201).json({ avatarPath: filePath });
  };
};
