import { Prisma } from '@prisma/client';

import { AdapterParams } from '@/adapter/types';

type Params = Pick<AdapterParams, 'db'>;

export type Count = (params: Prisma.UserCountArgs) => Promise<number | never>;
export const buildCount = ({ db }: Params): Count => {
  return async (args) => {
    const user = await db.client.user.count(args);

    return user;
  };
};
