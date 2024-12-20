import { buildCategoryService, CategoryService } from '@/domain/service/category';
import { buildStatusService, StatusService } from '@/domain/service/status';

import { Adapter } from '../types';

import { AuthService, buildAuthService } from './auth';
import { buildExampleService, ExampleService } from './example';

export type Service = {
  auth: AuthService;
  category: CategoryService;
  status: StatusService;
  example: ExampleService;
};

export const buildService = (params: Adapter): Service => {
  const auth = buildAuthService(params);
  const category = buildCategoryService(params);
  const status = buildStatusService(params);
  const example = buildExampleService(params);

  return {
    auth,
    category,
    status,
    example,
  };
};
