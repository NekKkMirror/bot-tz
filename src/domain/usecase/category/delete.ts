import { UseCaseParams } from '@/domain/usecase/types';
import { ICategory } from '@/domain/entity/category';
import { NotFoundError } from '@/domain/errors';

export type Delete = (data: { id: string }) => Promise<ICategory | never>;
export const buildDelete = ({ service, adapter }: UseCaseParams): Delete => {
  return async ({ id }) => {
    const category = await service.category.checkCategory({ id });

    if (!category) {
      throw new NotFoundError({
        code: 'CATEGORY_NOT_FOUND',
      });
    }

    return adapter.categoryRepository.delete({
      where: { id },
    });
  };
};
