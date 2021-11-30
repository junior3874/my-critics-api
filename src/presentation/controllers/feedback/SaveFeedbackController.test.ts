import { HttpResponse } from "@/presentation/interfaces/HTTPResponse";
import { ISaveFeedbackUseCase } from "@/useCases/interfaces/feedback/ISaveFeedbackUseCase";
import { mock, stub } from "jest-mock-extended";
import { SaveFeedbackController } from "./SaveFeedbackController";

describe("#saveFeedbackController", () => {
  const makeSut = () => {
    const saveFeedbackUseCase = mock<ISaveFeedbackUseCase>();
    const sut = new SaveFeedbackController(saveFeedbackUseCase);

    return { sut, saveFeedbackUseCase };
  };
  test("should save feedback with sucess", async () => {
    const { sut, saveFeedbackUseCase } = makeSut();
    const mockFeedback: SaveFeedbackController.Request = {
      message: "testing messgae",
      musicOrAlbumId: "testingurl.com",
      userId: "1",
      type: "album",
    };

    const res = await sut.handler(mockFeedback);
    const expectedResult: HttpResponse = {
      body: null,
      statusCode: 201,
    };
    expect(saveFeedbackUseCase.save).toHaveBeenCalledWith(mockFeedback);
    expect(res).toEqual(expectedResult);
  });
});
