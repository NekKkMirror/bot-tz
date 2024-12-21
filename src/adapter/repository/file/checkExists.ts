import fs from 'fs/promises';
import path from 'path';

type CheckExistsParams = {
  directory: string;
  filename: string;
};

export type CheckExists = (params: CheckExistsParams) => Promise<boolean>;
export const buildCheckExists = (): CheckExists => {
  return async ({ directory, filename }) => {
    const filePath = path.resolve(directory, filename);

    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  };
};
