import { Adapter } from '@/domain/types';

import { CheckExists, buildCheckExists } from '@/domain/service/file/checkExists';
import { buildDelete, Delete } from '@/domain/service/file//delete';
import { buildUpload, Upload } from '@/domain/service/file/upload';

export type FileService = {
  upload: Upload;
  checkExists: CheckExists;
  delete: Delete;
};

export const buildFileService = (params: Adapter): FileService => {
  const upload = buildUpload(params);
  const checkExists = buildCheckExists(params);
  const deleteFile = buildDelete(params);

  return {
    upload,
    checkExists,
    delete: deleteFile,
  };
};
