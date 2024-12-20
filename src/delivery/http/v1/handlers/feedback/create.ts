import { Response, Request } from 'express';

import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'feedback'>;
export type Create = (req: Request, res: Response) => Promise<Response>;

export const buildCreate = ({ feedback }: Params): Create => {
  return async (req, res) => {
    const { title, description, authorId, categoryId, statusId } = req.body;

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
