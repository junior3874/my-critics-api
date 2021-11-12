import { Controller } from "@/presentation/interfaces/Controller";
import { HttpResponse } from "@/presentation/interfaces/HTTPResponse";
import { ISaveCommentUseCase } from "@/useCases/interfaces/comment/ISaveCommentUseCase";

export class SaveCommentController
  implements Controller<SaveCommentController.Request>
{
  constructor(private readonly saveCommentUseCase: ISaveCommentUseCase) {}
  async handler(request: SaveCommentController.Request): Promise<HttpResponse> {
    const saveComment = await this.saveCommentUseCase.save(request);
    return {
      body: saveComment,
      statusCode: 201,
    };
  }
}

export namespace SaveCommentController {
  export type Request = {
    userId: string;
    message: string;
    feedbackId: string;
  };
}
