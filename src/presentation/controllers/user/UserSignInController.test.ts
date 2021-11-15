import { HttpResponse } from "@/presentation/interfaces/HTTPResponse";
import { IValidation } from "@/presentation/interfaces/IValidation";
import { UserNotFound } from "@/useCases/interfaces/user/errors";
import { IUserSignInUseCase } from "@/useCases/interfaces/user/IUserSignInUseCase";
import { mock } from "jest-mock-extended";
import { UserSignInController } from ".";

describe("#userSignInController", () => {
  const makeSut = () => {
    const userSignInUseCase = mock<IUserSignInUseCase>();
    const userSignInValidate =
      mock<IValidation<UserSignInController.Request>>();
    const sut = new UserSignInController(userSignInValidate, userSignInUseCase);

    return { sut, userSignInUseCase };
  };

  const makeUser = () => ({
    email: "testginuser@outlook.com",
    password: "teste",
  });

  test("should sign in with sucess", async () => {
    const { sut, userSignInUseCase } = makeSut();

    const user = makeUser();
    const mockUseCaseResponse: IUserSignInUseCase.Result = {
      accessToken: "testing",
      email: user.email,
      name: "testing",
      userImageProfileUrl: "testing",
      username: "testing",
    };

    userSignInUseCase.signIn.mockResolvedValue(mockUseCaseResponse);

    const res = await sut.handler(user);

    const expectedResult: HttpResponse = {
      body: mockUseCaseResponse,
      statusCode: 200,
    };
    expect(res).toEqual(expectedResult);
  });

  test("should not sign in, because user not found", async () => {
    const { sut, userSignInUseCase } = makeSut();

    const user = makeUser();

    userSignInUseCase.signIn.mockImplementation(() => {
      throw new UserNotFound();
    });

    const res = await sut.handler(user);

    const expectedResult: HttpResponse = {
      body: new UserNotFound(),
      statusCode: 403,
    };
    expect(res).toEqual(expectedResult);
  });

  test("should not sign, because any informations is missing", async () => {});
});
