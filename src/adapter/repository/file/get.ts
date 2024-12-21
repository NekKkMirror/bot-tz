import fs from 'fs/promises';
import path from 'path';

type GetParams = {
  directory: string;
  filename: string;
};

export type Get = (params: GetParams) => Promise<Buffer>;
export const buildGet = (): Get => {
  return async ({ directory, filename }) => {
    const filePath = path.resolve(directory, filename);

    try {
      return await fs.readFile(filePath);
    } catch (error: any) {
      throw new Error(`File not found: ${error.message}`);
    }
  };
};
