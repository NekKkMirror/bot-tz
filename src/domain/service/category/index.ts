import { Adapter } from '@/domain/types';

import { buildCheckCategory, CheckCategory } from './checkCategory';

export type CategoryService = {
  checkCategory: CheckCategory;
};

export const buildCategoryService = (params: Adapter): CategoryService => {
  const checkCategory = buildCheckCategory(params);

  return {
    checkCategory,
  };
};
