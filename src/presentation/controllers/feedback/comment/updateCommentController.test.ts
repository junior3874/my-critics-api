import { HttpResponse } from "@/presentation/interfaces/HTTPResponse";
import { IUpdateCommentUseCase } from "@/useCases/interfaces/comment/IUpdateCommentUseCase";
import { IUpdateCommentRepositorie } from "@/useCases/interfaces/repositories/IUpdateCommentRepositorie";
import { mock } from "jest-mock-extended";
import { UpdateCommentController } from "./updateCommentController";

describe("#updateCommentController", () => {
  const makeSut = () => {
    const updateCommentUseCase = mock<IUpdateCommentUseCase>();
    const sut = new UpdateCommentController(updateCommentUseCase);

    return { sut, updateCommentUseCase };
  };

  test("should update comment with sucess", async () => {
    const { updateCommentUseCase, sut } = makeSut();

    const mockUpdatedComment = {
      userId: "1",
      commentId: "1",
      message: "adoajdoajo",
    };

    updateCommentUseCase.save.mockResolvedValue({ message: "adoajdoajo" });
    const res = await sut.handler(mockUpdatedComment);

    const expectedRes: HttpResponse = {
      body: { message: mockUpdatedComment.message },
      statusCode: 201,
    };
    expect(res).toEqual(expectedRes);
  });
});
