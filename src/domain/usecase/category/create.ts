import { ICategory } from '@/domain/entity/category';
import { InvalidDataError } from '@/domain/errors';

import { UseCaseParams } from '../types';

export type Create = (data: { name: string }) => Promise<ICategory | never>;

export const buildCreate = ({ adapter }: UseCaseParams): Create => {
  return async ({ name }) => {
    const existingCategory = await adapter.categoryRepository.list({
      where: { name: { equals: name, mode: 'insensitive' } },
    });

    if (existingCategory.length > 0) {
      throw new InvalidDataError({
        code: 'CATEGORY_ALREADY_EXISTS',
      });
    }

    return adapter.categoryRepository.create({
      data: { name },
      select: { id: true, name: true },
    });
  };
};
