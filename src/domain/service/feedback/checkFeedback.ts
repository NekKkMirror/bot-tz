import { Adapter } from '@/domain/types';
import { IFeedback } from '@/domain/entity/feedback';

export type CheckFeedback = (data: { id: string }) => Promise<IFeedback | null | never>;

export const buildCheckFeedback = ({
  feedbackRepository,
}: Adapter): (({ id }: { id: string }) => Promise<null | IFeedback>) => {
  return async ({ id }: { id: string }) => {
    const feedback = await feedbackRepository.get({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    if (!feedback) {
      return null;
    }

    return feedback;
  };
};
