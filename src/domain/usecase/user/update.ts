import { NotFoundError } from '@/domain/errors';
import { TSafeUser } from '@/domain/entity/user';

import { UseCaseParams } from '../types';

export type Update = (data: { id: string; email?: string }) => Promise<TSafeUser | never>;

export const buildUpdate = ({ adapter, service }: UseCaseParams): Update => {
  return async (payload) => {
    const { id, ...data } = payload;
    const user = await service.user.checkUser({ id });

    if (!user) {
      throw new NotFoundError({
        code: 'USER_NOT_FOUND',
        message: `User with id ${id} does not exist.`,
      });
    }

    return adapter.userRepository.update({
      where: { id },
      data,
      select: { id: true, email: true, avatar: true },
    });
  };
};
