import { Response, Request } from 'express';

import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'status'>;
export type List = (req: Request, res: Response) => Promise<Response>;
export const buildList = ({ status }: Params): List => {
  return async (req, res) => {
    const { skip, take, ...filters } = req.query;
    const statuses = await status.list({
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      where: filters,
    });

    return res.status(200).json(statuses);
  };
};
