import fs from 'fs/promises';
import path from 'path';

type ListParams = {
  directory: string;
};

export type List = (params: ListParams) => Promise<string[]>;
export const buildList = (): List => {
  return async ({ directory }) => {
    const folderPath = path.resolve(directory);

    try {
      return await fs.readdir(folderPath);
    } catch (error: any) {
      throw new Error(`Error listing files: ${error.message}`);
    }
  };
};
