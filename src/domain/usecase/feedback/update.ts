import { IFeedback } from '@/domain/entity/feedback';
import { NotFoundError } from '@/domain/errors';
import { feedbackSelect } from '@/domain/usecase/feedback/selects';

import { UseCaseParams } from '../types';

export type Update = (data: {
  id: string;
  title?: string;
  description?: string;
  categoryId?: string;
  statusId?: string;
}) => Promise<IFeedback | never>;

export const buildUpdate = ({ adapter, service }: UseCaseParams): Update => {
  return async (payload) => {
    const { id, ...data } = payload;
    const feedback = await service.feedback.checkFeedback({ id });

    if (!feedback) {
      throw new NotFoundError({
        code: 'FEEDBACK_NOT_FOUND',
        message: `Feedback with id ${id} does not exist.`,
      });
    }

    return adapter.feedbackRepository.update({
      where: { id },
      data,
      select: feedbackSelect,
    });
  };
};
