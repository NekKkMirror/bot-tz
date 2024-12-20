import { Prisma } from '@prisma/client';

import { IStatus } from '@/domain/entity/status';

import { UseCaseParams } from '../types';

export type List = (params: Prisma.StatusFindManyArgs) => Promise<Array<IStatus> | never>;

export const buildList =
  ({ adapter }: UseCaseParams): List =>
  async (listParams) =>
    adapter.statusRepository.list(listParams);
