import { Response, Request } from 'express';

import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'category'>;
export type Delete = (req: Request, res: Response) => Promise<Response>;
export const buildDelete = ({ category }: Params): Delete => {
  return async (req, res) => {
    const { id } = req.params;

    await category.deleteCategory({ id });

    return res.status(204).send();
  };
};
