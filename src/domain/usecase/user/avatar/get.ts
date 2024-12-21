import { NotFoundError } from '@/domain/errors';
import { UseCaseParams } from '@/domain/usecase/types';
import { AVATAR_DIRECTORY } from '@/domain/usecase/user/avatar/constant';

export type Get = (data: { userId: string }) => Promise<string>;
export const buildGet = ({ adapter, service }: UseCaseParams): Get => {
  return async ({ userId }) => {
    const user = await adapter.userRepository.get({
      where: { id: userId },
    });

    if (!user || !user.avatar) {
      throw new NotFoundError({
        code: 'USER_OR_AVATAR_NOT_FOUND',
      });
    }

    const fileExists = await service.file.checkExists({
      directory: AVATAR_DIRECTORY,
      filename: user.avatar,
    });

    if (!fileExists) {
      throw new NotFoundError({
        code: 'AVATAR_NOT_FOUND',
      });
    }

    return `${AVATAR_DIRECTORY}/${user.avatar}`;
  };
};
