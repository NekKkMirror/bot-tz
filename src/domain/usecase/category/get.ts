import { ICategory } from '@/domain/entity/category';
import { NotFoundError } from '@/domain/errors';

import { UseCaseParams } from '../types';

export type Get = (data: { id: string }) => Promise<ICategory | never>;

export const buildGet = ({ service, adapter }: UseCaseParams): Get => {
  return async ({ id }) => {
    const isCategoryExist = await service.category.checkCategory({ id });

    if (!isCategoryExist) {
      throw new NotFoundError({
        code: 'CATEGORY_NOT_FOUND',
      });
    }

    const category = await adapter.categoryRepository.get({
      where: { id },
      select: { id: true, name: true },
    });

    return category as ICategory;
  };
};
