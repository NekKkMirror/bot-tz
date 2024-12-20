import { UseCaseParams } from '@/domain/usecase/types';

import { Delete, buildDelete } from './delete';
import { buildCreate, Create } from './create';
import { List, buildList } from './list';
import { buildGet, Get } from './get';

export type StatusUseCase = {
  create: Create;
  list: List;
  get: Get;
  deleteStatus: Delete;
};

export const buildStatusUseCase = (params: UseCaseParams): StatusUseCase => {
  const create = buildCreate(params);
  const list = buildList(params);
  const get = buildGet(params);
  const deleteStatus = buildDelete(params);

  return {
    create,
    list,
    get,
    deleteStatus,
  };
};
