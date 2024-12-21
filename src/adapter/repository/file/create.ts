import fs from 'fs/promises';
import path from 'path';

type CreateParams = {
  directory: string;
  filename: string;
  content: Buffer | string;
};

export type Create = (params: CreateParams) => Promise<string>;
export const buildCreate = (): Create => {
  return async ({ directory, filename, content }) => {
    const filePath = path.resolve(directory, filename);

    try {
      await fs.mkdir(directory, { recursive: true });
      await fs.writeFile(filePath, content);

      return filePath;
    } catch (error: any) {
      throw new Error(`Error creating file: ${error.message}`);
    }
  };
};
