import { Feedback } from "@/domain/entity/feedback";
import Album from "@/domain/entity/value-objects/Album";
import Music from "@/domain/entity/value-objects/Music";
import { ISaveFeedbackRepositorie } from "@/useCases/interfaces/repositories/ISaveFeedbackRepositorie";
import { ISaveFeedbackUseCase } from "../interfaces/feedback/ISaveFeedbackUseCase";

export default class FeedbackCreateUseCase implements ISaveFeedbackUseCase {
  feedback = Feedback;
  constructor(
    private readonly saveFeedbackRepository: ISaveFeedbackRepositorie
  ) {}
  async save({
    message,
    userId,
    musicOrAlbumId,
    type,
  }: ISaveFeedbackUseCase.Params): Promise<void> {
    const createFeedback = this.feedback.create({
      userId: userId as unknown as string,
      feedbackHas: musicOrAlbumId as unknown as Music | Album,
      message: message,
    });

    await this.saveFeedbackRepository.save({
      id: createFeedback.id,
      message,
      userId,
      musicOrAlbumId,
      type,
    });
  }
}
