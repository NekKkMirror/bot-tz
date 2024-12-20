import { Prisma } from '@prisma/client';

import { AdapterParams } from '@/adapter/types';

type Params = Pick<AdapterParams, 'db'>;

export type Count = (params: Prisma.FeedbackCountArgs) => Promise<number | never>;
export const buildCount = ({ db }: Params): Count => {
  return async (args) => {
    const count = await db.client.feedback.count(args);

    return count;
  };
};
