import { Response } from 'express';

import { DeliveryParams } from '@/delivery/types';
import { AuthRequest } from '@/delivery/http/v1/handlers/types';

type Params = Pick<DeliveryParams, 'feedback'>;
export type Create = (req: AuthRequest, res: Response) => Promise<Response>;

export const buildCreate = ({ feedback }: Params): Create => {
  return async (req, res) => {
    const authorId = req.user!.id;
    const { title, description, categoryId, statusId } = req.body;

    const createdFeedback = await feedback.create({
      title,
      description,
      authorId,
      categoryId,
      statusId,
    });

    return res.status(201).json(createdFeedback);
  };
};
