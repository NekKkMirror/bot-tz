import { UseCaseParams } from '@/domain/usecase/types';

import { Delete, buildDelete } from './delete';
import { buildCreate, Create } from './create';
import { List, buildList } from './list';
import { buildGet, Get } from './get';

export type CategoryUseCase = {
  create: Create;
  list: List;
  get: Get;
  deleteCategory: Delete;
};

export const buildCategoryUseCase = (params: UseCaseParams): CategoryUseCase => {
  const create = buildCreate(params);
  const list = buildList(params);
  const get = buildGet(params);
  const deleteCategory = buildDelete(params);

  return {
    create,
    list,
    get,
    deleteCategory,
  };
};
