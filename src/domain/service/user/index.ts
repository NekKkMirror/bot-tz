import { Adapter } from '@/domain/types';

import { buildCheckUser, CheckUser } from './checkUser';

export type UserService = {
  checkUser: CheckUser;
};

export const buildUserService = (params: Adapter): UserService => {
  const checkUser = buildCheckUser(params);

  return {
    checkUser,
  };
};
