import { UseCaseParams } from '@/domain/usecase/types';
import { IUpvote } from '@/domain/entity/upvote';
import { NotFoundError } from '@/domain/errors';

export type Delete = (data: { id: string }) => Promise<IUpvote | never>;
export const buildDelete = ({ service, adapter }: UseCaseParams): Delete => {
  return async ({ id }) => {
    const upvote = await service.upvote.checkUpvote({ id });

    if (!upvote) {
      throw new NotFoundError({
        code: 'UPVOTE_NOT_FOUND',
      });
    }

    return adapter.upvoteRepository.delete({
      where: { id },
    });
  };
};
