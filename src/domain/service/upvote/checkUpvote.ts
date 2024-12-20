import { Adapter } from '@/domain/types';
import { IUpvote } from '@/domain/entity/upvote';

export type CheckUpvote = (data: { id: string }) => Promise<IUpvote | null | never>;

export const buildCheckUpvote = ({
  upvoteRepository,
}: Adapter): (({ id }: { id: string }) => Promise<null | IUpvote>) => {
  return async ({ id }: { id: string }) => {
    const upvote = await upvoteRepository.get({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    if (!upvote) {
      return null;
    }

    return upvote;
  };
};
