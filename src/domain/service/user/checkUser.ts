import { Adapter } from '@/domain/types';
import { IUser } from '@/domain/entity/user';

export type CheckUser = (data: { id: string }) => Promise<IUser | null | never>;

export const buildCheckUser = ({
  userRepository,
}: Adapter): (({ id }: { id: string }) => Promise<null | IUser>) => {
  return async ({ id }: { id: string }) => {
    const user = await userRepository.get({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  };
};
