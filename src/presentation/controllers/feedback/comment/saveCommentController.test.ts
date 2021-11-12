import { HttpResponse } from "@/presentation/interfaces/HTTPResponse";
import { ISaveCommentUseCase } from "@/useCases/interfaces/comment/ISaveCommentUseCase";
import { mock } from "jest-mock-extended";
import { SaveCommentController } from "./saveCommentController";

describe("#saveCommentController", () => {
  const makeSut = () => {
    const saveCommentUseCase = mock<ISaveCommentUseCase>();
    const sut = new SaveCommentController(saveCommentUseCase);

    return { sut, saveCommentUseCase };
  };
  test("should save comment with sucess", async () => {
    const { sut, saveCommentUseCase } = makeSut();
    // readonly id: IUUID.Value;
    // readonly userId: IUser.Id;
    // readonly feedbackId: IFeedback.Id;
    // message: string;

    const mockComment = {
      userId: "1",
      message: "testing",
      feedbackId: "1",
    };
    saveCommentUseCase.save.mockResolvedValue({ id: "1", message: "testing" });
    const res = await sut.handler(mockComment);

    const expectedRes: HttpResponse = {
      body: { id: "1", message: "testing" },
      statusCode: 201,
    };
    expect(saveCommentUseCase.save).toHaveBeenCalledWith(mockComment);
    expect(res).toEqual(expectedRes);
  });
});
