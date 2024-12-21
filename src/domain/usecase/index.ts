import { buildCategoryUseCase, CategoryUseCase } from '@/domain/usecase/category';
import { buildStatusUseCase, StatusUseCase } from '@/domain/usecase/status';
import { buildFeedbackUseCase, FeedbackUseCase } from '@/domain/usecase/feedback';
import { AuthUseCase, buildAuthUseCase } from '@/domain/usecase/auth';
import { buildExampleUseCase, ExampleUseCase } from '@/domain/usecase/example';
import { buildUpvoteUseCase, UpvoteUseCase } from '@/domain/usecase/upvote';
import { buildUserUseCase, UserUseCase } from '@/domain/usecase/user';

import { UseCaseParams } from './types';

export type UseCase = {
  auth: AuthUseCase;
  user: UserUseCase;
  upvote: UpvoteUseCase;
  feedback: FeedbackUseCase;
  category: CategoryUseCase;
  status: StatusUseCase;
  example: ExampleUseCase;
};

export const buildUseCase = (params: UseCaseParams): UseCase => {
  const auth = buildAuthUseCase(params);
  const user = buildUserUseCase(params);
  const upvote = buildUpvoteUseCase(params);
  const feedback = buildFeedbackUseCase(params);
  const category = buildCategoryUseCase(params);
  const status = buildStatusUseCase(params);
  const example = buildExampleUseCase(params);

  return {
    auth,
    user,
    upvote,
    feedback,
    category,
    status,
    example,
  };
};
