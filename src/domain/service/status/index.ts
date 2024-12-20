import { Adapter } from '@/domain/types';

import { buildCheckStatus, CheckStatus } from './checkStatus';

export type StatusService = {
  checkStatus: CheckStatus;
};

export const buildStatusService = (params: Adapter): StatusService => {
  const checkStatus = buildCheckStatus(params);

  return {
    checkStatus,
  };
};
