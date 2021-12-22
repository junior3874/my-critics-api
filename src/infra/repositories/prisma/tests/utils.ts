import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const resetDB = async () => {
  await prisma.user.deleteMany({});
};

export const insertRandomUserInDB = async (): Promise<number> => {
  const res = prisma.user
    .create({
      data: {
        email: "testing",
        imageProfileUrl: "testing",
        name: "testing",
        password: "testing",
        username: "testing",
      },
    })
    .then((res) => res.id);
  return res;
};
