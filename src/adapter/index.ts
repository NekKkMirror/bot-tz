import { buildExampleGateway, ExampleGateway } from './gateway/example';
import { buildUserRepository, UserRepository } from './repository/user';
import { AdapterParams } from './types';

export type Adapter = {
  userRepository: UserRepository;
  exampleGateway: ExampleGateway;
};

export const buildAdapter = (params: AdapterParams): Adapter => {
  const userRepository = buildUserRepository(params);
  const exampleGateway = buildExampleGateway(params);

  return {
    userRepository,
    exampleGateway,
  };
};
