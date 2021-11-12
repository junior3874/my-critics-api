import { ILoadFeedbacksRepositorie } from "@/useCases/interfaces/repositories";
import { Controller } from "@/presentation/interfaces/Controller";
import { HttpResponse } from "@/presentation/interfaces/HTTPResponse";

export class IndexFeedbackController implements Controller {
  constructor(
    private readonly loadFeedbackRepository: ILoadFeedbacksRepositorie
  ) {}
  async handler(
    request: IndexFeedbackController.Request
  ): Promise<HttpResponse> {
    const { page } = request;

    const res = await this.loadFeedbackRepository.load(page);
    if (res.length === 0) {
      return {
        body: [],
        statusCode: 204,
      };
    }
    return {
      body: res,
      statusCode: 202,
    };
  }
}

export namespace IndexFeedbackController {
  export type Request = {
    page: number;
  };
}
