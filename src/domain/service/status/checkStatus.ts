import { Adapter } from '@/domain/types';
import { IStatus } from '@/domain/entity/status';

export type CheckStatus = (data: { id: string }) => Promise<IStatus | null | never>;

export const buildCheckStatus = ({
  statusRepository,
}: Adapter): (({ id }: { id: string }) => Promise<null | IStatus>) => {
  return async ({ id }: { id: string }) => {
    const status = await statusRepository.get({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    if (!status) {
      return null;
    }

    return status;
  };
};
