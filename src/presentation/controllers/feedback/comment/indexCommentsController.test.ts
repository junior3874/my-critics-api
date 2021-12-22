import { User } from "@/domain/entity/user";
import { HttpResponse } from "@/presentation/interfaces/HTTPResponse";
import { ILoadCommentsInFeedbackRepositorie } from "@/useCases/interfaces/repositories";
import { mock } from "jest-mock-extended";
import { IndexCommentsController } from "./indexCommentsController";

describe("#indexCommentsController", () => {
  const makeSut = () => {
    const loadCommentsRepositorie = mock<ILoadCommentsInFeedbackRepositorie>();
    const sut = new IndexCommentsController(loadCommentsRepositorie);
    return { sut, loadCommentsRepositorie };
  };
  test("should index comments with sucess", async () => {
    const { loadCommentsRepositorie, sut } = makeSut();

    const expectedResponseInLoadComments: ILoadCommentsInFeedbackRepositorie.Result[] =
      [
        {
          id: "tes45",
          message: "testingMessage",
          upvotes: { negatives: 0, positives: 0 },
          user: {
            id: "testing",
            imageProfileUrl: "testing",
            name: "user",
            username: "user",
          },
        },
        {
          id: "tes46",
          message: "testingMessage",
          upvotes: { negatives: 0, positives: 0 },
          user: {
            id: "testing",
            imageProfileUrl: "testing",
            name: "user",
            username: "user",
          },
        },
      ];
    loadCommentsRepositorie.load.mockResolvedValue(
      expectedResponseInLoadComments
    );
    const res = await sut.handler({ feedbackId: "1", index: 0 });

    const expectedRes: HttpResponse = {
      body: expectedResponseInLoadComments,
      statusCode: 200,
    };
    expect(res).toEqual(expectedRes);
  });
});
