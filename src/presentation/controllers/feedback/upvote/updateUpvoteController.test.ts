import { HttpResponse } from "@/presentation/interfaces/HTTPResponse";
import { IUpdateUpvoteRepositorie } from "@/useCases/interfaces/repositories/IUpdateUpvoteRepositorie";
import { mock } from "jest-mock-extended";
import { UpdateUpvoteController } from "./updateUpvoteController";

describe("#updateUpvoteRepositorie", () => {
  const makeSut = () => {
    const updateUpvoteRepositorie = mock<IUpdateUpvoteRepositorie>();
    const sut = new UpdateUpvoteController(updateUpvoteRepositorie);

    return { sut, updateUpvoteRepositorie };
  };
  test("should update upvote with sucess", async () => {
    const { sut, updateUpvoteRepositorie } = makeSut();

    const mockReq = { type: true, upvoteId: "1", userId: 1 };

    const res = await sut.handler(mockReq);
    const expectedRes: HttpResponse = {
      body: null,
      statusCode: 204,
    };
    expect(updateUpvoteRepositorie.update).toHaveBeenCalledWith(mockReq);
    expect(res).toEqual(expectedRes);
  });
});
