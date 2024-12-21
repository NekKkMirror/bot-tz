import fs from 'fs/promises';
import path from 'path';

type DeleteParams = {
  directory: string;
  filename: string;
};

export type Delete = (params: DeleteParams) => Promise<void>;
export const buildDelete = (): Delete => {
  return async ({ directory, filename }) => {
    const filePath = path.resolve(directory, filename);

    try {
      await fs.unlink(filePath);
    } catch (error: any) {
      if (error.code !== 'ENOENT') {
        throw new Error(`Error deleting file: ${error.message}`);
      }
    }
  };
};
