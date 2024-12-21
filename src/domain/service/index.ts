import { buildCategoryService, CategoryService } from '@/domain/service/category';
import { buildStatusService, StatusService } from '@/domain/service/status';
import { buildFeedbackService, FeedbackService } from '@/domain/service/feedback';
import { buildUpvoteService, UpvoteService } from '@/domain/service/upvote';
import { AuthService, buildAuthService } from '@/domain/service/auth';
import { buildExampleService, ExampleService } from '@/domain/service/example';
import { buildFileService, FileService } from '@/domain/service/file';
import { buildUserService, UserService } from '@/domain/service/user';

import { Adapter } from '../types';

export type Service = {
  auth: AuthService;
  user: UserService;
  upvote: UpvoteService;
  feedback: FeedbackService;
  category: CategoryService;
  status: StatusService;
  example: ExampleService;
  file: FileService;
};

export const buildService = (params: Adapter): Service => {
  const auth = buildAuthService(params);
  const user = buildUserService(params);
  const upvote = buildUpvoteService(params);
  const feedback = buildFeedbackService(params);
  const category = buildCategoryService(params);
  const status = buildStatusService(params);
  const example = buildExampleService(params);
  const file = buildFileService(params);

  return {
    auth,
    user,
    upvote,
    feedback,
    category,
    status,
    example,
    file,
  };
};
