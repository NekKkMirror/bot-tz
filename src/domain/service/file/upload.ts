import { Adapter } from '@/domain/types';

export type Upload = (data: {
  directory: string;
  filename: string;
  content: Buffer | string;
}) => Promise<string>;

export const buildUpload = ({ fileRepository }: Adapter): Upload => {
  return async ({ directory, filename, content }) => {
    const exists = await fileRepository.checkExists({ directory, filename });

    if (exists) {
      await fileRepository.delete({ directory, filename });
    }

    return fileRepository.create({ directory, filename, content });
  };
};
