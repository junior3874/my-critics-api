import { noContent } from "@/presentation/helpers/http-helper";
import { Controller } from "@/presentation/interfaces/Controller";
import { HttpResponse } from "@/presentation/interfaces/HTTPResponse";
import { IUpdateUpvoteRepositorie } from "@/useCases/interfaces/repositories/IUpdateUpvoteRepositorie";

export class UpdateUpvoteController implements Controller {
  constructor(
    private readonly updateUpvoteRepositorie: IUpdateUpvoteRepositorie
  ) {}
  async handler(
    request: UpdateUpvoteController.Request
  ): Promise<HttpResponse> {
    const res = await this.updateUpvoteRepositorie.update(request);
    return noContent();
  }
}

export namespace UpdateUpvoteController {
  export type Request = {
    type: boolean;
    userId: number;
    upvoteId: string;
  };
}
