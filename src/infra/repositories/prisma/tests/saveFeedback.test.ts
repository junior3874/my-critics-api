import PrismaAdapter from "../prisma-adapter";
import { insertRandomUserInDB, resetDB } from "./utils";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("#saveFeedbackRepositorie", () => {
  afterEach(async () => {
    await resetDB();
  });
  test("should save feedback with sucess", async () => {
    const { saveFeedback } = PrismaAdapter();

    const userId = await insertRandomUserInDB();
    const mockReq = {
      id: "1",
      type: "album",
      message: "testing",
      musicOrAlbumId: "1",
      userId: userId,
    };
    await saveFeedback.save({
      id: "1",
      type: "album",
      message: "testing",
      musicOrAlbumId: "1",
      userId: userId,
    });

    const res = await prisma.feedback.findUnique({ where: { id: "1" } });
    expect(res).toEqual(mockReq);
  });
});
