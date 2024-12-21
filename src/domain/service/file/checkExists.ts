import { Adapter } from '@/domain/types';

export type CheckExists = (data: { directory: string; filename: string }) => Promise<boolean>;
export const buildCheckExists = ({ fileRepository }: Adapter): CheckExists => {
  return async ({ directory, filename }) => {
    return fileRepository.checkExists({ directory, filename });
  };
};
