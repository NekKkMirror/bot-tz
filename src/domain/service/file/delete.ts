import { Adapter } from '@/domain/types';

export type Delete = (data: { directory: string; filename: string }) => Promise<void>;

export const buildDelete = ({ fileRepository }: Adapter): Delete => {
  return async ({ directory, filename }) => {
    const exists = await fileRepository.checkExists({ directory, filename });

    if (!exists) {
      throw new Error('File not found');
    }

    await fileRepository.delete({ directory, filename });
  };
};
