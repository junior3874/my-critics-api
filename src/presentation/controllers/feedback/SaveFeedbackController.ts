import { Controller } from "@/presentation/interfaces/Controller";
import { HttpResponse } from "@/presentation/interfaces/HTTPResponse";
import { ISaveFeedbackUseCase } from "@/useCases/interfaces/feedback/ISaveFeedbackUseCase";

export class SaveFeedbackController implements Controller {
  constructor(private readonly saveFeedbackUseCase: ISaveFeedbackUseCase) {}
  async handler(
    request: SaveFeedbackController.Request
  ): Promise<HttpResponse> {
    await this.saveFeedbackUseCase.save(request);
    return {
      body: null,
      statusCode: 201,
    };
  }
}

export namespace SaveFeedbackController {
  export type Request = {
    userId: number;
    message: string;
    musicOrAlbumId: string;
    type: "album" | "track";
  };
}
