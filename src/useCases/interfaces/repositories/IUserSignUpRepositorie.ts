import User from "@/domain/entity/user";
import { IUserSignUpUseCase } from "@/useCases/interfaces/user/IUserSignUpUseCase";

export interface IUserSignUpRepositorie {
  signUp: (data: User) => Promise<IUserSignUpUseCase.Result>;
}
