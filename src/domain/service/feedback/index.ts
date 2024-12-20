import { Adapter } from '@/domain/types';

import { buildCheckFeedback, CheckFeedback } from './checkFeedback';

export type FeedbackService = {
  checkFeedback: CheckFeedback;
};

export const buildFeedbackService = (params: Adapter): FeedbackService => {
  const checkFeedback = buildCheckFeedback(params);

  return {
    checkFeedback,
  };
};
