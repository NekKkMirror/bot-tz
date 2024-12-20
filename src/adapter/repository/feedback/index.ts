import { AdapterParams } from '@/adapter/types';

import { buildCount, Count } from './count';
import { buildCreate, Create } from './create';
import { buildDelete, Delete } from './delete';
import { buildGet, Get } from './get';
import { buildList, List } from './list';
import { buildUpdate, Update } from './update';
import { buildFindPaginate, FindPaginate } from './findPaginate';

type Params = Pick<AdapterParams, 'db'>;

export type FeedbackRepository = {
  create: Create;
  update: Update;
  count: Count;
  findPaginate: FindPaginate;
  list: List;
  get: Get;
  delete: Delete;
};

export const buildFeedbackRepository = (params: Params): FeedbackRepository => {
  const create = buildCreate(params);
  const update = buildUpdate(params);
  const count = buildCount(params);
  const get = buildGet(params);
  const findPaginate = buildFindPaginate(params);
  const list = buildList(params);
  const deleteFeedback = buildDelete(params);

  return {
    create,
    update,
    count,
    findPaginate,
    list,
    get,
    delete: deleteFeedback,
  };
};
