import { UseCaseParams } from '@/domain/usecase/types';
import {
  buildUpload as buildUploadAvatar,
  Upload as UploadAvatar,
} from '@/domain/usecase/user/avatar/upload';
import { buildGet as buildGetAvatar, Get as GetAvatar } from '@/domain/usecase/user/avatar/get';
import {
  buildDelete as buildDeleteAvatar,
  Delete as DeleteAvatar,
} from '@/domain/usecase/user/avatar/delete';
import { buildUpdate, Update } from '@/domain/usecase/user/update';

export type UserUseCase = {
  update: Update;

  avatar: {
    upload: UploadAvatar;
    get: GetAvatar;
    delete: DeleteAvatar;
  };
};

export const buildUserUseCase = (params: UseCaseParams): UserUseCase => {
  const update = buildUpdate(params);

  const uploadAvatar = buildUploadAvatar(params);
  const getAvatar = buildGetAvatar(params);
  const deleteAvatar = buildDeleteAvatar(params);

  return {
    update,

    avatar: {
      upload: uploadAvatar,
      get: getAvatar,
      delete: deleteAvatar,
    },
  };
};
