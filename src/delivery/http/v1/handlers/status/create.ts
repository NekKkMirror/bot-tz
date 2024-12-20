import { Response, Request } from 'express';

import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'status'>;
export type Create = (req: Request, res: Response) => Promise<Response>;
export const buildCreate = ({ status }: Params): Create => {
  return async (req, res) => {
    const { name } = req.body;
    const newStatus = await status.create({ name });

    return res.status(200).json(newStatus);
  };
};
