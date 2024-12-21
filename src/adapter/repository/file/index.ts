import { Create, buildCreate } from './create';
import { Delete, buildDelete } from './delete';
import { Get, buildGet } from './get';
import { List, buildList } from './list';
import { CheckExists, buildCheckExists } from './checkExists';

export type FileRepository = {
  create: Create;
  checkExists: CheckExists;
  list: List;
  get: Get;
  delete: Delete;
};

export const buildFileRepository = (): FileRepository => {
  const create = buildCreate();
  const checkExists = buildCheckExists();
  const list = buildList();
  const get = buildGet();
  const deleteFile = buildDelete();

  return {
    create,
    checkExists,
    list,
    get,
    delete: deleteFile,
  };
};
