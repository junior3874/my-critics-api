import { Controller } from "@/presentation/interfaces/Controller";
import { HttpResponse } from "@/presentation/interfaces/HTTPResponse";
import { ILoadCommentsInFeedbackRepositorie } from "@/useCases/interfaces/repositories";

export class IndexCommentsController implements Controller {
  constructor(
    private readonly loadCommentsRepositorie: ILoadCommentsInFeedbackRepositorie
  ) {}
  async handler(
    request: IndexCommentsController.Request
  ): Promise<HttpResponse> {
    const loadComments = await this.loadCommentsRepositorie.load(request);
    return {
      body: loadComments,
      statusCode: 200,
    };
  }
}

export namespace IndexCommentsController {
  export type Request = {
    feedbackId: string;
    index: number;
    repliesByComment?: string;
    order?: string;
  };
}

// commentUrn=urn:li:comment:(activity:6863138651048685568,6863196048874061824)&count=10&cursor=UFJFVklPVVNfMTYzNjQ3MjQ3MTkxOF9DTEVBTg==&q=repliesByCursor
