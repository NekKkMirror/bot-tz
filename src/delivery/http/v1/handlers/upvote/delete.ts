import { Response, Request } from 'express';

import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'upvote'>;
export type Delete = (req: Request, res: Response) => Promise<Response>;
export const buildDelete = ({ upvote }: Params): Delete => {
  return async (req, res) => {
    const { id } = req.params;

    await upvote.deleteUpvote({ id });

    return res.status(204).send();
  };
};
