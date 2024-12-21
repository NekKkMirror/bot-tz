import { NotFoundError } from '@/domain/errors';
import { UseCaseParams } from '@/domain/usecase/types';
import { generateUniqueFilename } from '@/lib/utils/generateUniqueFilename';
import { AVATAR_DIRECTORY } from '@/domain/usecase/user/avatar/constant';

export type Upload = (data: { userId: string; file: Express.Multer.File }) => Promise<string>;
export const buildUpload = ({ adapter, service }: UseCaseParams): Upload => {
  return async ({ userId, file }) => {
    const user = await service.user.checkUser({ id: userId });

    if (!user) {
      throw new NotFoundError({
        code: 'USER_NOT_FOUND',
      });
    }

    if (user.avatar) {
      await service.file.delete({ directory: AVATAR_DIRECTORY, filename: user.avatar });
    }

    const newAvatarFilename = generateUniqueFilename(file.originalname, userId);
    await service.file.upload({
      directory: AVATAR_DIRECTORY,
      filename: newAvatarFilename,
      content: file.buffer,
    });

    await adapter.userRepository.update({
      where: { id: userId },
      data: { avatar: newAvatarFilename },
    });

    return newAvatarFilename;
  };
};
