import { NotFoundError } from '@/domain/errors';
import { UseCaseParams } from '@/domain/usecase/types';
import { AVATAR_DIRECTORY } from '@/domain/usecase/user/avatar/constant';
import { IUser } from '@/domain/entity/user';

export type Delete = (data: { userId: string }) => Promise<void>;
export const buildDelete = ({ adapter, service }: UseCaseParams): Delete => {
  return async ({ userId }) => {
    const isUserExists = await service.user.checkUser({ id: userId });

    if (!isUserExists) {
      throw new NotFoundError({
        code: 'USER_NOT_FOUND',
      });
    }

    const user = (await adapter.userRepository.get({ where: { id: userId } })) as IUser;

    if (!user.avatar) {
      throw new NotFoundError({
        code: 'AVATAR_NOT_FOUND',
      });
    }

    await service.file.delete({
      directory: AVATAR_DIRECTORY,
      filename: user.avatar,
    });

    await adapter.userRepository.update({
      where: { id: userId },
      data: { avatar: null },
    });
  };
};
