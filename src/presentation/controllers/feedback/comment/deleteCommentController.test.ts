import { HttpResponse } from "@/presentation/interfaces/HTTPResponse";
import { IDeleteCommentRepositorie } from "@/useCases/interfaces/repositories/IDeleteCommentRepositorie";
import { mock } from "jest-mock-extended";
import { DeleteCommentController } from "./deleteCommentController";

describe("#deleteCommentController", () => {
  const makeSut = () => {
    const deleteCommentRepositorie = mock<IDeleteCommentRepositorie>();
    const sut = new DeleteCommentController(deleteCommentRepositorie);

    return { sut, deleteCommentRepositorie };
  };
  test("should delete comment with sucess", async () => {
    const { sut, deleteCommentRepositorie } = makeSut();

    const res = await sut.handler({ userId: "1", commentId: "1" });

    const expectedRes: HttpResponse = {
      body: null,
      statusCode: 204,
    };
    expect(deleteCommentRepositorie.delete).toHaveBeenCalledWith("1", "1");
    expect(res).toEqual(expectedRes);
  });
});
