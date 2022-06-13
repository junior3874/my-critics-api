import { User } from "@/domain/entity/user";

import {
  ICheckUsernameRepositorie,
  ILoadFeedbacksRepositorie,
  ILoadUserByEmailRepositorie,
  ISaveFeedbackRepositorie,
  IUserSignUpRepositorie,
} from "@/useCases/interfaces/repositories";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function PrismaAdapter() {
  const signUp: IUserSignUpRepositorie = {
    async signUp({ userImageProfileUrl, ...rest }: User): Promise<boolean> {
      
      prisma.
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

  const saveFeedback: ISaveFeedbackRepositorie = {
    async save(data: ISaveFeedbackRepositorie.Params): Promise<void> {
      await prisma.feedback.create({
        data,
      });
      return;
    },
  };

  const indexFeedbacks: ILoadFeedbacksRepositorie = {
    async load(page: number): Promise<ILoadFeedbacksRepositorie.Result[]> {
      return;
    },
  };

  return { signUp, loadUserByEmail, saveFeedback };
}

export default PrismaAdapter;
