import { Response, Request } from 'express';

import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'status'>;
export type Get = (req: Request, res: Response) => Promise<Response>;
export const buildGet = ({ status }: Params): Get => {
  return async (req, res) => {
    const { id } = req.params;
    const foundStatus = await status.get({ id });

    return res.status(200).json(foundStatus);
  };
};
