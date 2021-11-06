import { UserNotFound } from "./errors";

export interface IUserSignInUseCase {
  signIn: (
    account: IUserSignInUseCase.Params
  ) => Promise<IUserSignInUseCase.Result | UserNotFound>;
}

export namespace IUserSignInUseCase {
  export type Params = {
    email: string;
    password: string;
  };

  export type Result = {
    accessToken: string;
    name: string;
    username: string;
    userImageProfileUrl: string;
    email: string;
  };
}
