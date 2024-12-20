import { Prisma } from '@prisma/client';

import { ICategory } from '@/domain/entity/category';

import { UseCaseParams } from '../types';

export type List = (params: Prisma.CategoryFindManyArgs) => Promise<Array<ICategory> | never>;

export const buildList =
  ({ adapter }: UseCaseParams): List =>
  async (listParams) =>
    adapter.categoryRepository.list(listParams);
