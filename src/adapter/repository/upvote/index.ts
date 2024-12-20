import { AdapterParams } from '@/adapter/types';

import { buildCreate, Create } from './create';
import { buildGet, Get } from './get';
import { buildDelete, Delete } from './delete';

type Params = Pick<AdapterParams, 'db'>;

export type UpvoteRepository = {
  create: Create;
  get: Get;
  delete: Delete;
};

export const buildUpvoteRepository = (params: Params): UpvoteRepository => {
  const create = buildCreate(params);
  const get = buildGet(params);
  const deleteUpvote = buildDelete(params);

  return {
    create,
    get,
    delete: deleteUpvote,
  };
};
