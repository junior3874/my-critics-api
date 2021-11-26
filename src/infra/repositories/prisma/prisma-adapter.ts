import User from "@/domain/entity/user";
import user from "@/domain/entity/user";
import {
  ICheckUsernameRepositorie,
  ILoadUserByEmailRepositorie,
  IUserSignUpRepositorie,
} from "@/useCases/interfaces/repositories";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function PrismaAdapter() {
  const signUp: IUserSignUpRepositorie = {
    async signUp({ userImageProfileUrl, ...rest }: User): Promise<boolean> {
      await prisma.user.create({
        data: { ...rest, imageProfileUrl: userImageProfileUrl },
      });
      return;
    },
  };

  const loadUserByEmail: ILoadUserByEmailRepositorie = {
    async load(email: string): Promise<ILoadUserByEmailRepositorie.Result> {
      const [user] = await prisma.user.findMany({
        where: { email },
        select: {
          id: true,
          password: true,
        },
      });

      return user;
    },
  };

  return { signUp, loadUserByEmail };
}

export default PrismaAdapter;
