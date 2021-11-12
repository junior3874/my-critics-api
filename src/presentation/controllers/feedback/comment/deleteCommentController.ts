import { noContent } from "@/presentation/helpers/http-helper";
import { Controller } from "@/presentation/interfaces/Controller";
import { HttpResponse } from "@/presentation/interfaces/HTTPResponse";
import { IDeleteCommentRepositorie } from "@/useCases/interfaces/repositories/IDeleteCommentRepositorie";

export class DeleteCommentController
  implements Controller<DeleteCommentController.Request>
{
  constructor(
    private readonly deleteCommentRepositorie: IDeleteCommentRepositorie
  ) {}
  async handler(
    request: DeleteCommentController.Request
  ): Promise<HttpResponse> {
    const { commentId, userId } = request;
    await this.deleteCommentRepositorie.delete(userId, commentId);

    return noContent();
  }
}

export namespace DeleteCommentController {
  export type Request = {
    userId: string;
    commentId: string;
  };
}
