import { Controller } from "@/presentation/interfaces/Controller";
import { HttpResponse } from "@/presentation/interfaces/HTTPResponse";
import { ISaveUpvoteUseCase } from "@/useCases/interfaces/upvote/ISaveUpvoteUseCase";

export class SaveUpvoteController implements Controller {
  constructor(private readonly saveUpvoteUseCase: ISaveUpvoteUseCase) {}
  async handler(request: SaveUpvoteController.Request): Promise<HttpResponse> {
    const useCaseRes = await this.saveUpvoteUseCase.save(request);

    return {
      body: useCaseRes,
      statusCode: 201,
    };
  }
}

export namespace SaveUpvoteController {
  export type Request = {
    type: boolean;
    userId: number;
    entityId: string;
  };
}
