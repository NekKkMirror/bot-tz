import { Response, Request } from 'express';

import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'upvote'>;
export type Create = (req: Request, res: Response) => Promise<Response>;
export const buildCreate = ({ upvote }: Params): Create => {
  return async (req, res) => {
    const { userId, feedbackId } = req.body;
    const newUpvote = await upvote.create({ userId, feedbackId });

    return res.status(200).json(newUpvote);
  };
};
