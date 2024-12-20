import { Prisma } from '@prisma/client';

import { AdapterParams } from '@/adapter/types';
import { IFeedback } from '@/domain/entity/feedback';

type Params = Pick<AdapterParams, 'db'>;

export type Get = (params: Prisma.FeedbackFindFirstArgs) => Promise<IFeedback | null | never>;

export const buildGet = ({ db }: Params): Get => {
  return async (getParams) => db.client.feedback.findFirst(getParams);
};
