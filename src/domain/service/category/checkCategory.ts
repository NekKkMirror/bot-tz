import { Adapter } from '@/domain/types';
import { ICategory } from '@/domain/entity/category';

export type CheckCategory = (data: { id: string }) => Promise<ICategory | null | never>;

export const buildCheckCategory = ({
  categoryRepository,
}: Adapter): (({ id }: { id: string }) => Promise<null | ICategory>) => {
  return async ({ id }: { id: string }) => {
    const category = await categoryRepository.get({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    if (!category) {
      return null;
    }

    return category;
  };
};
