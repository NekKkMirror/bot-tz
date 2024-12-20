import { Response, Request } from 'express';

import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'feedback'>;
export type Delete = (req: Request, res: Response) => Promise<Response>;

export const buildDelete = ({ feedback }: Params): Delete => {
  return async (req, res) => {
    const { id } = req.params;

    await feedback.deleteFeedback({ id });

    return res.status(204).send();
  };
};
