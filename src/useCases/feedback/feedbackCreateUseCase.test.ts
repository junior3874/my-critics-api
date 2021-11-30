import Feedback from "@/domain/entity/feedback";
import { ISaveFeedbackRepositorie } from "@/useCases/interfaces/repositories/ISaveFeedbackRepositorie";
import { mock } from "jest-mock-extended";
import FeedbackCreateUseCase from "./feedbackCreateUseCase";

describe("feedbackCreateUseCase", () => {
  const makeSut = () => {
    const saveFeedbackRepository = mock<ISaveFeedbackRepositorie>();
    const sut = new FeedbackCreateUseCase(saveFeedbackRepository);
    return { sut, saveFeedbackRepository };
  };

  test("should save feedback with sucess", async () => {
    const { sut, saveFeedbackRepository } = makeSut();

    const mockFeedback: ISaveFeedbackRepositorie.Params = {
      message: "testing",
      userId: "1",
      musicOrAlbumId: "testingUrl",
      type: "track",
      id: "1",
    };

    jest.spyOn(Feedback, "create").mockReturnValue(
      //@ts-ignore
      new Feedback({
        id: "1",
        ...mockFeedback,
      })
    );

    await sut.save(mockFeedback);
    expect(Feedback.create).toHaveBeenCalledWith({
      userId: mockFeedback.userId,
      message: mockFeedback.message,
      feedbackHas: mockFeedback.musicOrAlbumId,
    });
    expect(saveFeedbackRepository.save).toHaveBeenCalledWith(mockFeedback);
  });
});
