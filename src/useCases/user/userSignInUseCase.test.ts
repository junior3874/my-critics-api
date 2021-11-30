import { IEncrypter, IHashComparer } from "@/useCases/interfaces/cryptograph";
import { ILoadUserByEmailRepositorie } from "@/useCases/interfaces/repositories/ILoadUserByEmailRepositorie";
import { ILoadUserEssentialsDataRepositorie } from "@/useCases/interfaces/repositories/ILoadUserEssentialsDataRepositorie";
import { mock } from "jest-mock-extended";
import { UserNotFound } from "../interfaces/user/errors";
import { IUserSignInUseCase } from "../interfaces/user/IUserSignInUseCase";
import UserSignInUseCase from "./userSignInUseCase";

describe("#userSignInUseCase", () => {
  const makeSut = () => {
    const loadUserByEmailRepository = mock<ILoadUserByEmailRepositorie>();
    const hashComparer = mock<IHashComparer>();
    const encrypter = mock<IEncrypter>();
    const loadUserEssentialsDataRepository =
      mock<ILoadUserEssentialsDataRepositorie>();

    //   private readonly loadUsertByEmailRepository: LoadAccountByEmailRepository,
    //   private readonly hashComparer: HashComparer,

    const sut = new UserSignInUseCase(
      loadUserByEmailRepository,
      hashComparer,
      encrypter,
      loadUserEssentialsDataRepository
    );

    return {
      sut,
      loadUserByEmailRepository,
      loadUserEssentialsDataRepository,
      hashComparer,
      encrypter,
    };
  };

  test("should sign with sucess", async () => {
    const {
      sut,
      hashComparer,
      loadUserByEmailRepository,
      loadUserEssentialsDataRepository,
      encrypter,
    } = makeSut();
    const mockUser = {
      email: "testing@testing.com",
      password: "abc",
    };

    const expectedResult: IUserSignInUseCase.Result = {
      accessToken: "aaa",
      name: "testing",
      username: "testing user",
      userImageProfileUrl: "",
      email: mockUser.email,
    };

    loadUserByEmailRepository.load.mockResolvedValue({
      id: 1,
      password: mockUser.password,
    });

    hashComparer.compare.mockResolvedValue(true);
    encrypter.encrypt.mockResolvedValue(expectedResult.accessToken);

    loadUserEssentialsDataRepository.load.mockResolvedValue({
      email: expectedResult.email,
      userImageProfileUrl: expectedResult.userImageProfileUrl,
      username: expectedResult.username,
      name: expectedResult.name,
    });

    const res = await sut.signIn(mockUser);

    expect(loadUserByEmailRepository.load).toHaveBeenCalledWith(mockUser.email);
    expect(hashComparer.compare).toHaveBeenLastCalledWith(
      mockUser.password,
      mockUser.password
    );
    expect(encrypter.encrypt).toHaveBeenCalledWith("1");
    expect(loadUserEssentialsDataRepository.load).toHaveBeenCalledWith("1");
    expect(res).toEqual(expectedResult);
  });

  test("should not sign in, because email is wrong", async () => {
    const { sut, loadUserByEmailRepository } = makeSut();

    loadUserByEmailRepository.load.mockResolvedValue(undefined);
    try {
      await sut.signIn({
        email: "testing@testing.com",
        password: "testing",
      });
    } catch (err) {
      expect(err).toBeInstanceOf(UserNotFound);
    }
  });

  test("should not sign in, because password is wrong", async () => {
    const { sut, loadUserByEmailRepository, hashComparer } = makeSut();

    loadUserByEmailRepository.load.mockResolvedValue({
      id: 1,
      password: "testing",
    });

    hashComparer.compare.mockResolvedValue(false);
    try {
      await sut.signIn({
        email: "testing@testing.com",
        password: "testing",
      });
    } catch (err) {
      expect(err).toBeInstanceOf(UserNotFound);
    }
  });
});
