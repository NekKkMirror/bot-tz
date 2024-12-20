import { Response, Request } from 'express';

import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'category'>;
export type Get = (req: Request, res: Response) => Promise<Response>;
export const buildGet = ({ category }: Params): Get => {
  return async (req, res) => {
    const { id } = req.params;
    const foundCategory = await category.get({ id });

    return res.status(200).json(foundCategory);
  };
};
