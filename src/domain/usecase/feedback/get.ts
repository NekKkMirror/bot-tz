import { IFeedback, IFeedbackWithVotes } from '@/domain/entity/feedback';
import { NotFoundError } from '@/domain/errors';
import { feedbackRelationSelect } from '@/domain/usecase/feedback/selects';

import { UseCaseParams } from '../types';

export type Get = (data: { id: string }) => Promise<IFeedbackWithVotes | never>;

export const buildGet = ({ service, adapter }: UseCaseParams): Get => {
  return async ({ id }) => {
    const isFeedbackExist = await service.feedback.checkFeedback({ id });

    if (!isFeedbackExist) {
      throw new NotFoundError({
        code: 'FEEDBACK_NOT_FOUND',
      });
    }

    const feedback = (await adapter.feedbackRepository.get({
      where: { id },
      select: feedbackRelationSelect,
    })) as IFeedback;

    return {
      ...feedback,
      voteCount: feedback.upvotes ? feedback.upvotes.length : 0,
    };
  };
};
