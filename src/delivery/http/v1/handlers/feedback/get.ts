import { Response, Request } from 'express';

import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'feedback'>;
export type Get = (req: Request, res: Response) => Promise<Response>;

export const buildGet = ({ feedback }: Params): Get => {
  return async (req, res) => {
    const { id } = req.params;

    const feedbackDetails = await feedback.get({ id });

    return res.status(200).json(feedbackDetails);
  };
};
