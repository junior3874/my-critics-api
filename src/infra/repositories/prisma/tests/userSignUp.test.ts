import { prisma } from ".prisma/client";
import PrismaAdapter from "../prisma-adapter";
import resetDB from "./resetDb";

describe("#userSignUpRepositorie", () => {
  afterEach(async () => {
    await resetDB();
  });
  test("should user sign up with sucess", async () => {
    const { loadUserByEmail, signUp } = PrismaAdapter();
    await signUp.signUp({
      email: "testing@hotmail.com",
      name: "testing",
      password: "testing",
      userImageProfileUrl: "testing",
      username: "testing",
    });

    const res = await loadUserByEmail.load("testing@hotmail.com");
    expect(res.password).toEqual("testing");
  });
});
