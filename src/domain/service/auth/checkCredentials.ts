import * as bcrypt from 'bcrypt';

import { TSafeUser } from '@/domain/entity/user';
import { Adapter } from '@/domain/types';

export type CheckCredentials = (data: {
  email: string;
  password: string;
}) => Promise<TSafeUser | null | never>;

export const buildCheckCredentials = ({ userRepository }: Adapter): CheckCredentials => {
  return async ({ email, password }) => {
    const user = await userRepository.get({
      where: {
        email: {
          mode: 'insensitive',
          equals: email,
        },
        password: {
          not: null,
        },
      },
      select: {
        id: true,
        email: true,
        avatar: true,
        created_at: true,
        password: true,
      },
    });

    if (!user || !user.password) {
      return null;
    }

    const { password: storedPassword, ...res } = user;
    const passwordsSame = await bcrypt.compare(password, storedPassword);

    if (!passwordsSame) {
      return null;
    }

    return res;
  };
};
