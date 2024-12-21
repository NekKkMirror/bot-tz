import multer, { Multer, StorageEngine } from 'multer';
import { Request, RequestHandler } from 'express';

type FileUploaderOptions = {
  fieldName: string;
  allowedMimeTypes: string[];
  maxSize: number;
};

export const fileUploader = ({
  fieldName,
  allowedMimeTypes,
  maxSize,
}: FileUploaderOptions): RequestHandler => {
  const storage: StorageEngine = multer.memoryStorage();

  const upload: Multer = multer({
    storage,
    limits: {
      fileSize: maxSize,
    },
    fileFilter: (req: Request, file, cb) => {
      if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type.'));
      }
    },
  });

  return upload.single(fieldName);
};
