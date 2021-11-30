import { IEncrypter, IHashComparer } from "@/useCases/interfaces/cryptograph";
import { ILoadUserByEmailRepositorie } from "@/useCases/interfaces/repositories/ILoadUserByEmailRepositorie";
import { ILoadUserEssentialsDataRepositorie } from "@/useCases/interfaces/repositories/ILoadUserEssentialsDataRepositorie";
import { UserNotFound } from "../interfaces/user/errors";
import { IUserSignInUseCase } from "../interfaces/user/IUserSignInUseCase";

export default class UserSignInUseCase implements IUserSignInUseCase {
  constructor(
    private readonly loadUserByEmailRepository: ILoadUserByEmailRepositorie,
    private readonly hashComparer: IHashComparer,
    private readonly encrypter: IEncrypter,
    private readonly loadUserEssentialsDataRepository: ILoadUserEssentialsDataRepositorie
  ) {}
  async signIn(
    account: IUserSignInUseCase.Params
  ): Promise<IUserSignInUseCase.Result | UserNotFound> {
    const user = await this.loadUserByEmailRepository.load(account.email);
    if (!user) throw new UserNotFound();

    const valid = await this.hashComparer.compare(
      user.password,
      account.password
    );

    if (!valid) throw new UserNotFound();
    const accessToken = await this.encrypter.encrypt(user.id.toString());
    const getUserData = await this.loadUserEssentialsDataRepository.load(
      user.id.toString()
    );
    return {
      ...getUserData,
      accessToken,
    };
  }
}
