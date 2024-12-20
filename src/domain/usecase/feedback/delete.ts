import { UseCaseParams } from '@/domain/usecase/types';
import { IFeedback } from '@/domain/entity/feedback';
import { NotFoundError } from '@/domain/errors';

export type Delete = (data: { id: string }) => Promise<IFeedback | never>;
export const buildDelete = ({ service, adapter }: UseCaseParams): Delete => {
  return async ({ id }) => {
    const feedback = await service.feedback.checkFeedback({ id });

    if (!feedback) {
      throw new NotFoundError({
        code: 'FEEDBACK_NOT_FOUND',
      });
    }

    return adapter.feedbackRepository.delete({
      where: { id },
    });
  };
};
