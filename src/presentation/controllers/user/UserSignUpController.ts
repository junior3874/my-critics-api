import { IUser } from "@/domain/entity/user";
import { Controller } from "@/presentation/interfaces/Controller";
import { HttpResponse } from "@/presentation/interfaces/HTTPResponse";
import { EmailAlreadyExist } from "@/useCases/interfaces/user/errors";
import { IUserSignUpUseCase } from "@/useCases/interfaces/user/IUserSignUpUseCase";

export class UserSignUpController implements Controller {
  constructor(private readonly userSignUpUseCase: IUserSignUpUseCase) {}
  async handler(request: UserSignUpController.Request): Promise<HttpResponse> {
    try {
      const res = await this.userSignUpUseCase.signUp(request);
      return {
        body: res,
        statusCode: 201,
      };
    } catch (err) {
      let statusCode = 400;
      if (err instanceof EmailAlreadyExist) {
        statusCode = 409;
      }
      return {
        body: err,
        statusCode: statusCode,
      };
    }
  }
}

export namespace UserSignUpController {
  export type Request = IUser.Params;
}
