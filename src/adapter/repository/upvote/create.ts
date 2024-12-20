import { Prisma } from '@prisma/client';

import { AdapterParams, UnknownTx } from '@/adapter/types';
import { IUpvote } from '@/domain/entity/upvote';

type Params = Pick<AdapterParams, 'db'>;

export type Create = (data: Prisma.UpvoteCreateArgs, tx?: UnknownTx) => Promise<IUpvote | never>;
export const buildCreate = ({ db }: Params): Create => {
  return async (data, tx) => {
    return (await db.getContextClient(tx).upvote.create(data)) as IUpvote;
  };
};
