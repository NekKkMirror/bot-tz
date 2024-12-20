import { Response, Request } from 'express';

import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'category'>;
export type Create = (req: Request, res: Response) => Promise<Response>;
export const buildCreate = ({ category }: Params): Create => {
  return async (req, res) => {
    const { name } = req.body;
    const newCategory = await category.create({ name });

    return res.status(200).json(newCategory);
  };
};
