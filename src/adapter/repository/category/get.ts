import { Prisma } from '@prisma/client';

import { AdapterParams } from '@/adapter/types';
import { ICategory } from '@/domain/entity/category';

type Params = Pick<AdapterParams, 'db'>;

export type Get = (params: Prisma.CategoryFindFirstArgs) => Promise<ICategory | null | never>;
export const buildGet = ({ db }: Params): Get => {
  return async (getParams) => {
    const category = (await db.client.category.findFirst(getParams)) as ICategory | null;

    return category;
  };
};
