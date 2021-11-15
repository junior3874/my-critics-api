import { Controller } from "@/presentation/interfaces/Controller";
import { HttpResponse } from "@/presentation/interfaces/HTTPResponse";
import { IUpdateCommentUseCase } from "@/useCases/interfaces/comment/IUpdateCommentUseCase";

export class UpdateCommentController implements Controller {
  constructor(private readonly updateCommentUseCase: IUpdateCommentUseCase) {}
  async handler(
    request: UpdateCommentController.Request
  ): Promise<HttpResponse> {
    try {
      const updatedComment = await this.updateCommentUseCase.update(request);

      return {
        body: updatedComment,
        statusCode: 201,
      };
    } catch (err) {}
    throw new Error("Method not implemented.");
  }
}

export namespace UpdateCommentController {
  export type Request = {
    userId: string;
    commentId: string;
    message: string;
  };
}
