import { IUser } from "@/domain/entity/user";
import { EmailAlreadyExist, UsernameAlreadyExist } from "./errors";

export interface IUserSignUpUseCase {
  signUp: (
    account: IUserSignUpUseCase.Params
  ) => Promise<
    IUserSignUpUseCase.Result | EmailAlreadyExist | UsernameAlreadyExist
  >;
}

export namespace IUserSignUpUseCase {
  export type Params = IUser.Params;

  export type Result = boolean;
}
