import { Response } from 'express';

import { DeliveryParams } from '@/delivery/types';

import { AuthRequest } from '../types';

type Params = Pick<DeliveryParams, 'upvote'>;
export type Create = (req: AuthRequest, res: Response) => Promise<Response>;
export const buildCreate = ({ upvote }: Params): Create => {
  return async (req, res) => {
    const userId = req.user!.id;
    const { feedbackId } = req.body;
    const newUpvote = await upvote.create({ userId, feedbackId });

    return res.status(200).json(newUpvote);
  };
};
