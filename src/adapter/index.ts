import { buildExampleGateway, ExampleGateway } from './gateway/example';
import {
  buildUserRepository,
  UserRepository,
  buildCategoryRepository,
  CategoryRepository,
  buildStatusRepository,
  StatusRepository,
  buildFeedbackRepository,
  FeedbackRepository,
  buildUpvoteRepository,
  UpvoteRepository,
} from './repository';
import { AdapterParams } from './types';

export type Adapter = {
  userRepository: UserRepository;
  upvoteRepository: UpvoteRepository;
  feedbackRepository: FeedbackRepository;
  categoryRepository: CategoryRepository;
  statusRepository: StatusRepository;

  exampleGateway: ExampleGateway;
};

export const buildAdapter = (params: AdapterParams): Adapter => {
  const userRepository = buildUserRepository(params);
  const upvoteRepository = buildUpvoteRepository(params);
  const feedbackRepository = buildFeedbackRepository(params);
  const categoryRepository = buildCategoryRepository(params);
  const statusRepository = buildStatusRepository(params);

  const exampleGateway = buildExampleGateway(params);

  return {
    userRepository,
    upvoteRepository,
    feedbackRepository,
    categoryRepository,
    statusRepository,

    exampleGateway,
  };
};
