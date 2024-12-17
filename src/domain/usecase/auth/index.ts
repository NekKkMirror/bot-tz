import { UseCaseParams } from '@/domain/usecase/types';

import { buildGetMe, GetMe } from './getMe';
import { Refresh, buildRefresh } from './refresh';
import { Authorize, buildAuthorize } from './authorize';
import { buildRegister, Register } from './register';

export type AuthUseCase = {
  getMe: GetMe;
  refresh: Refresh;
  authorize: Authorize;
  register: Register;
};

export const buildAuthUseCase = (params: UseCaseParams): AuthUseCase => {
  const getMe = buildGetMe(params);
  const refresh = buildRefresh(params);
  const authorize = buildAuthorize(params);
  const register = buildRegister(params);

  return {
    getMe,
    refresh,
    authorize,
    register,
  };
};
