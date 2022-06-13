import PrismaAdapter from "../prisma-adapter";
import { resetDB } from "./utils";

describe("#indexFeedbacks", () => {
  afterEach(async () => {
    await resetDB();
  });
  test("should index feedback with sucess", async () => {
    const {} = PrismaAdapter();
  });
});
