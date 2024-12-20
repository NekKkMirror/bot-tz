import { UseCaseParams } from '@/domain/usecase/types';
import { IStatus } from '@/domain/entity/status';
import { NotFoundError } from '@/domain/errors';

export type Delete = (data: { id: string }) => Promise<IStatus | never>;
export const buildDelete = ({ service, adapter }: UseCaseParams): Delete => {
  return async ({ id }) => {
    const status = await service.status.checkStatus({ id });

    if (!status) {
      throw new NotFoundError({
        code: 'STATUS_NOT_FOUND',
      });
    }

    return adapter.statusRepository.delete({
      where: { id },
    });
  };
};
