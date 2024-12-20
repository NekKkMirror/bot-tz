import { buildCategoryUseCase, CategoryUseCase } from '@/domain/usecase/category';
import { buildStatusUseCase, StatusUseCase } from '@/domain/usecase/status';

import { AuthUseCase, buildAuthUseCase } from './auth';
import { buildExampleUseCase, ExampleUseCase } from './example';
import { UseCaseParams } from './types';

export type UseCase = {
  auth: AuthUseCase;
  category: CategoryUseCase;
  status: StatusUseCase;
  example: ExampleUseCase;
};

export const buildUseCase = (params: UseCaseParams): UseCase => {
  const auth = buildAuthUseCase(params);
  const category = buildCategoryUseCase(params);
  const status = buildStatusUseCase(params);
  const example = buildExampleUseCase(params);

  return {
    auth,
    category,
    status,
    example,
  };
};
