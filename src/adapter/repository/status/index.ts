import { AdapterParams } from '@/adapter/types';

import { buildDelete, Delete } from './delete';
import { List, buildList } from './list';
import { buildCreate, Create } from './create';
import { buildGet, Get } from './get';

type Params = Pick<AdapterParams, 'db'>;

export type StatusRepository = {
  create: Create;
  list: List;
  get: Get;
  delete: Delete;
};
export const buildStatusRepository = (params: Params): StatusRepository => {
  const create = buildCreate(params);
  const list = buildList(params);
  const get = buildGet(params);
  const deleteCategory = buildDelete(params);

  return {
    create,
    list,
    get,
    delete: deleteCategory,
  };
};
