import { forbidden } from "@/presentation/helpers/http-helper";
import { Controller } from "@/presentation/interfaces/Controller";
import { HttpResponse } from "@/presentation/interfaces/HTTPResponse";
import { IValidation } from "@/presentation/interfaces/IValidation";
import { IUserSignInUseCase } from "@/useCases/interfaces/user/IUserSignInUseCase";

export class UserSignInController implements Controller {
  constructor(
    private readonly signInValidation: IValidation<UserSignInController.Request>,
    private readonly userSignInUseCase: IUserSignInUseCase
  ) {}
  async handler(request: UserSignInController.Request): Promise<HttpResponse> {
    try {
      const res = await this.userSignInUseCase.signIn(request);
      return {
        body: res,
        statusCode: 200,
      };
    } catch (err) {
      return forbidden(err);
    }
  }
}

export namespace UserSignInController {
  export type Request = {
    email: string;
    password: string;
  };
}
