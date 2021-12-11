import { HttpResponse } from "@/presentation/interfaces/HTTPResponse";
import { UpvoteNotFoundError } from "@/useCases/errors/UpvoteNotFoundError";
import { IDeleteUpvoteRepositorie } from "@/useCases/interfaces/repositories/IDeleteUpvoteRepositorie";
import { mock } from "jest-mock-extended";
import { DeleteUpvoteController } from "./deleteUpvoteController";

describe("#deleteUpvoteController", () => {
  const makeSut = () => {
    const deleteUpvoteRepositorie = mock<IDeleteUpvoteRepositorie>();
    // const deleteUpvoteRepositorie = mock<IdeleteUpvoteRepositorie>();
    const sut = new DeleteUpvoteController(deleteUpvoteRepositorie);

    return { sut, deleteUpvoteRepositorie };
  };
  test("should delete upvote in comment or feedback with sucess", async () => {
    const { sut, deleteUpvoteRepositorie } = makeSut();

    const mockRequest = { upvoteId: "1", userId: 1 };
    deleteUpvoteRepositorie.delete.mockResolvedValue();
    const res = await sut.handler(mockRequest);

    const expectedRes: HttpResponse = {
      statusCode: 204,
      body: null,
    };
    expect(deleteUpvoteRepositorie.delete).toHaveBeenCalledWith(
      mockRequest.upvoteId,
      mockRequest.userId
    );
    expect(res).toEqual(expectedRes);
  });

  test("should not delete upvote, because this upvote not pertenced for this user id, or it not exist", async () => {
    const { sut, deleteUpvoteRepositorie } = makeSut();

    const mockRequest = { upvoteId: "1", userId: 1 };
    deleteUpvoteRepositorie.delete.mockImplementationOnce(() => {
      throw new UpvoteNotFoundError();
    });

    const res = await sut.handler(mockRequest);
    const expectedRes: HttpResponse = {
      body: null,
      statusCode: 404,
    };
    expect(res).toEqual(expectedRes);
  });
});
