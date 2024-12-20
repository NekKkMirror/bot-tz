import { UseCaseParams } from '@/domain/usecase/types';

import { Delete, buildDelete } from './delete';
import { buildCreate, Create } from './create';
import { buildUpdate, Update } from './update';
import { buildGet, Get } from './get';
import { buildFindPaginate, FindPaginate } from './findPaginate';

export type FeedbackUseCase = {
  create: Create;
  update: Update;
  findPaginate: FindPaginate;
  get: Get;
  deleteFeedback: Delete;
};

export const buildFeedbackUseCase = (params: UseCaseParams): FeedbackUseCase => {
  const create = buildCreate(params);
  const update = buildUpdate(params);
  const findPaginate = buildFindPaginate(params);
  const get = buildGet(params);
  const deleteFeedback = buildDelete(params);

  return {
    create,
    update,
    findPaginate,
    get,
    deleteFeedback,
  };
};
