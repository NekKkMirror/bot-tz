import { Prisma } from '@prisma/client';

import { ICategory } from '@/domain/entity/category';
import { AdapterParams, UnknownTx } from '@/adapter/types';

type Params = Pick<AdapterParams, 'db'>;

export type Delete = (
  data: Prisma.CategoryDeleteArgs,
  tx?: UnknownTx,
) => Promise<ICategory | never>;

export const buildDelete = ({ db }: Params): Delete => {
  return async (data, tx) => {
    return (await db.getContextClient(tx).category.delete(data)) as ICategory;
  };
};
