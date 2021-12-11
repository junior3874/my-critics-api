import { HttpResponse } from "@/presentation/interfaces/HTTPResponse";
import { ISaveUpvoteUseCase } from "@/useCases/interfaces/upvote/ISaveUpvoteUseCase";
import { mock } from "jest-mock-extended";
import { SaveUpvoteController } from "./saveUpvoteController";

describe("#saveUpvoteController", () => {
  const makeSut = () => {
    const saveUpvoteUseCase = mock<ISaveUpvoteUseCase>();
    const sut = new SaveUpvoteController(saveUpvoteUseCase);

    return { sut, saveUpvoteUseCase };
  };
  test("should save upvote with sucess", async () => {
    const { sut, saveUpvoteUseCase } = makeSut();

    const mockValue = { entityId: "1", type: true, userId: 1 };
    saveUpvoteUseCase.save.mockResolvedValue({ id: "3", type: true });
    const res = await sut.handler(mockValue);
    const expectedRes: HttpResponse = {
      body: {
        id: "3",
        type: true,
      },
      statusCode: 201,
    };
    expect(saveUpvoteUseCase.save).toHaveBeenCalledWith(mockValue);
    expect(res).toEqual(expectedRes);
  });
});
