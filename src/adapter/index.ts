import { buildExampleGateway, ExampleGateway } from './gateway/example';
import {
  buildUserRepository,
  UserRepository,
  buildCategoryRepository,
  CategoryRepository,
  buildStatusRepository,
  StatusRepository,
} from './repository';
import { AdapterParams } from './types';

export type Adapter = {
  userRepository: UserRepository;
  categoryRepository: CategoryRepository;
  statusRepository: StatusRepository;

  exampleGateway: ExampleGateway;
};

export const buildAdapter = (params: AdapterParams): Adapter => {
  const userRepository = buildUserRepository(params);
  const categoryRepository = buildCategoryRepository(params);
  const statusRepository = buildStatusRepository(params);

  const exampleGateway = buildExampleGateway(params);

  return {
    userRepository,
    categoryRepository,
    statusRepository,

    exampleGateway,
  };
};
