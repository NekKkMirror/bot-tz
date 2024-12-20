import { buildCategoryService, CategoryService } from '@/domain/service/category';
import { buildStatusService, StatusService } from '@/domain/service/status';
import { buildFeedbackService, FeedbackService } from '@/domain/service/feedback';

import { Adapter } from '../types';

import { AuthService, buildAuthService } from './auth';
import { buildExampleService, ExampleService } from './example';

export type Service = {
  auth: AuthService;
  feedback: FeedbackService;
  category: CategoryService;
  status: StatusService;
  example: ExampleService;
};

export const buildService = (params: Adapter): Service => {
  const auth = buildAuthService(params);
  const feedback = buildFeedbackService(params);
  const category = buildCategoryService(params);
  const status = buildStatusService(params);
  const example = buildExampleService(params);

  return {
    auth,
    feedback,
    category,
    status,
    example,
  };
};
