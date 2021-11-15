import { InvalidEmailError } from "@/domain/entity/errors/InvalidEmailError";
import { HttpResponse } from "@/presentation/interfaces/HTTPResponse";
import { EmailAlreadyExist } from "@/useCases/interfaces/user/errors";
import { IUserSignUpUseCase } from "@/useCases/interfaces/user/IUserSignUpUseCase";
import { mock } from "jest-mock-extended";
import { UserSignUpController } from "./UserSignUpController";

describe("#userSignUpController", () => {
  const makeSut = () => {
    const userSignUpUseCase = mock<IUserSignUpUseCase>();
    const sut = new UserSignUpController(userSignUpUseCase);
    return { sut, userSignUpUseCase };
  };

  const makeUser = () => ({
    email: "testing@email.com",
    name: "Andre",
    password: "testing",
    username: "testing",
  });
  test("should signUp with sucess", async () => {
    const { sut, userSignUpUseCase } = makeSut();

    const user = makeUser();

    userSignUpUseCase.signUp.mockResolvedValue(true);
    const res = await sut.handler(user);

    const expectedResult: HttpResponse = {
      body: true,
      statusCode: 201,
    };
    expect(res).toEqual(expectedResult);
  });

  test("should not signUp with sucess, because this email is invalid", async () => {
    const { sut, userSignUpUseCase } = makeSut();

    const user = makeUser();

    userSignUpUseCase.signUp.mockImplementation(() => {
      throw new InvalidEmailError();
    });
    const res = await sut.handler(user);

    const expectedResult: HttpResponse = {
      body: new InvalidEmailError(),
      statusCode: 400,
    };
    expect(res).toEqual(expectedResult);
  });

  test("should not signUp with sucess, because this email already exist", async () => {
    const { sut, userSignUpUseCase } = makeSut();

    const user = makeUser();

    userSignUpUseCase.signUp.mockImplementation(() => {
      throw new EmailAlreadyExist();
    });
    const res = await sut.handler(user);

    const expectedResult: HttpResponse = {
      body: new EmailAlreadyExist(),
      statusCode: 409,
    };
    expect(res).toEqual(expectedResult);
  });
});
