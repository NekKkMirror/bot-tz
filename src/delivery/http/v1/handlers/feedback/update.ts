import { Response, Request } from 'express';

import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'feedback'>;
export type Update = (req: Request, res: Response) => Promise<Response>;

export const buildUpdate = ({ feedback }: Params): Update => {
  return async (req, res) => {
    const { id } = req.params;
    const { title, description, categoryId, statusId } = req.body;

    const updatedFeedback = await feedback.update({
      id,
      title,
      description,
      categoryId,
      statusId,
    });

    return res.status(200).json(updatedFeedback);
  };
};
