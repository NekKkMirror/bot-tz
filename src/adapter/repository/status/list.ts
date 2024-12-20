import { Prisma } from '@prisma/client';

import { AdapterParams } from '@/adapter/types';
import { IStatus } from '@/domain/entity/status';

type Params = Pick<AdapterParams, 'db'>;

export type List = (params: Prisma.StatusFindManyArgs) => Promise<Array<IStatus> | never>;
export const buildList = ({ db }: Params): List => {
  return async (getParams) => {
    const status = (await db.client.status.findMany(getParams)) as Array<IStatus>;

    return status;
  };
};
