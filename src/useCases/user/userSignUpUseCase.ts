import { IHasher } from "@/useCases/interfaces/cryptograph";
import { ICheckEmailRepositorie } from "@/useCases/interfaces/repositories/ICheckEmailRepositorie";
import { ICheckUsernameRepositorie } from "@/useCases/interfaces/repositories/ICheckUsernameRepositorie";
import { IUserSignUpRepositorie } from "@/useCases/interfaces/repositories/IUserSignUpRepositorie";
import { InvalidEmailError } from "@/domain/entity/errors/InvalidEmailError";
import { User } from "@/domain/entity/user";
import {
  EmailAlreadyExist,
  UsernameAlreadyExist,
} from "../interfaces/user/errors";

import { IUserSignUpUseCase } from "../interfaces/user/IUserSignUpUseCase";

export default class UserSignUpUseCase implements IUserSignUpUseCase {
  private readonly user = User;
  constructor(
    private readonly addUserRepository: IUserSignUpRepositorie,
    private readonly checkEmailRepository: ICheckEmailRepositorie,
    private readonly checkUsernameRepository: ICheckUsernameRepositorie,
    private readonly hasher: IHasher
  ) {}
  async signUp(
    account: IUserSignUpUseCase.Params
  ): Promise<
    IUserSignUpUseCase.Result | EmailAlreadyExist | InvalidEmailError
  > {
    const verifyEmail = await this.checkEmailRepository.check(account.email);
    const verifyUsername = await this.checkUsernameRepository.check(
      account.username
    );

    if (verifyEmail) {
      throw new EmailAlreadyExist();
    }

    if (verifyUsername) {
      throw new UsernameAlreadyExist();
    }
    const user = this.user.create(account);

    const hashedPassword = await this.hasher.hash(account.password);

    const expectedUser = { ...user, password: hashedPassword } as User;
    await this.addUserRepository.signUp(expectedUser);

    return true;
  }
}
