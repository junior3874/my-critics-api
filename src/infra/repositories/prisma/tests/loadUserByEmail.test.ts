import PrismaAdapter from "../prisma-adapter";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("#loadUserByEmailRepositorie", () => {
  test("should load user with sucess", async () => {
    const { loadUserByEmail } = PrismaAdapter();

    await prisma.user.create({
      data: {
        email: "testing@hotmail.com",
        imageProfileUrl: "",
        password: "testing",
        username: "testing",
        name: "testing",
        id: 1,
      },
    });

    const result = await loadUserByEmail.load("testing@hotmail.com");
    expect(result).toEqual({ id: 1, password: "testing" });
  });
});
