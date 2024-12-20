import { Response, Request } from 'express';

import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'status'>;
export type Delete = (req: Request, res: Response) => Promise<Response>;
export const buildDelete = ({ status }: Params): Delete => {
  return async (req, res) => {
    const { id } = req.params;

    await status.deleteStatus({ id });

    return res.status(204).send();
  };
};
