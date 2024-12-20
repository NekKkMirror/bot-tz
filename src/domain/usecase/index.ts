import { buildCategoryUseCase, CategoryUseCase } from '@/domain/usecase/category';
import { buildStatusUseCase, StatusUseCase } from '@/domain/usecase/status';
import { buildFeedbackUseCase, FeedbackUseCase } from '@/domain/usecase/feedback';
import { AuthUseCase, buildAuthUseCase } from '@/domain/usecase/auth';
import { buildExampleUseCase, ExampleUseCase } from '@/domain/usecase/example';

import { UseCaseParams } from './types';

export type UseCase = {
  auth: AuthUseCase;
  feedback: FeedbackUseCase;
  category: CategoryUseCase;
  status: StatusUseCase;
  example: ExampleUseCase;
};

export const buildUseCase = (params: UseCaseParams): UseCase => {
  const auth = buildAuthUseCase(params);
  const feedback = buildFeedbackUseCase(params);
  const category = buildCategoryUseCase(params);
  const status = buildStatusUseCase(params);
  const example = buildExampleUseCase(params);

  return {
    auth,
    feedback,
    category,
    status,
    example,
  };
};
