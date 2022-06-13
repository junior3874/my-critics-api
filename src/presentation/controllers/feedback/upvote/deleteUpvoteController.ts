import { noContent } from "@/presentation/helpers/http-helper";
import { Controller } from "@/presentation/interfaces/Controller";
import { HttpResponse } from "@/presentation/interfaces/HTTPResponse";
import { IDeleteUpvoteRepositorie } from "@/useCases/interfaces/repositories/IDeleteUpvoteRepositorie";


export class DeleteUpvoteController implements Controller {
  constructor(
    private readonly deleteUpvoteRepositorie: IDeleteUpvoteRepositorie
  ) {}
  async handler(
    request: DeleteUpvoteController.Request
  ): Promise<HttpResponse> {
    try {
      await this.deleteUpvoteRepositorie.delete(
        request.upvoteId,
        request.userId
      );
      return noContent();
    } catch (err) {
      return {
        body: null,
        statusCode: 404,
      };
    }
  }
}

export namespace DeleteUpvoteController {
  export type Request = {
    upvoteId: string;
    userId: number;
  };
}
