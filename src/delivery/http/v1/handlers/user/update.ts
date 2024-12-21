import { Response, Request } from 'express';

import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'user'>;
export type Update = (req: Request, res: Response) => Promise<Response>;

export const buildUpdate = ({ user }: Params): Update => {
  return async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;

    const updatedUser = await user.update({
      id,
      email,
    });

    return res.status(200).json(updatedUser);
  };
};
