import { UseCaseParams } from '@/domain/usecase/types';

import { Delete, buildDelete } from './delete';
import { buildCreate, Create } from './create';

export type UpvoteUseCase = {
  create: Create;
  deleteUpvote: Delete;
};

export const buildUpvoteUseCase = (params: UseCaseParams): UpvoteUseCase => {
  const create = buildCreate(params);
  const deleteUpvote = buildDelete(params);

  return {
    create,
    deleteUpvote,
  };
};
