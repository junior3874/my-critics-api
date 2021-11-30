import { Controller } from "@/presentation/interfaces/Controller";
import { HttpResponse } from "@/presentation/interfaces/HTTPResponse";
import { IServiceRequestAudioFeatures } from "@/useCases/interfaces/services/IServiceRequestAudioFeatures";

export class IndexTopTracksController implements Controller {
  constructor(
    private readonly indexTopTracksService: IServiceRequestAudioFeatures
  ) {}
  async handler(
    request: IndexTopTracksController.Request
  ): Promise<HttpResponse> {
    const { index } = request;
    const tracks = await this.indexTopTracksService.load(index);
    return {
      body: tracks,
      statusCode: 200,
    };
  }
}

export namespace IndexTopTracksController {
  export type Request = {
    index?: number;
  };
}
