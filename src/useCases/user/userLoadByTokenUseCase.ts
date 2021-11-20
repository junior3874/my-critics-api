import { IUserLoadByTokenUseCase } from "../interfaces/user/IUserLoadByTokenUseCase";

export class UserLoadByTokenUseCase implements IUserLoadByTokenUseCase {
  load(acessToken: string): Promise<IUserLoadByTokenUseCase.Result> {
    return;
  }
}
