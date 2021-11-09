import { InvalidEmailError } from "@/domain/entity/errors/InvalidEmailError";
import { MissingParamError } from "@/presentation/errors";
import { IValidation } from "../presentation/interfaces/IValidation";
import { YupAdapter } from "./yup-adapter";

describe("#yupAdapter", () => {
  const sut = new YupAdapter();
  test("should validate empty fields with success", async () => {
    const res = await sut.validateSignUp({
      email: "",
      password: "",
    });

    const expectedResult: IValidation.Result = [
      {
        error: true,
        fieldName: "email",
        errorName: new MissingParamError("email").message,
      },
      {
        error: true,
        fieldName: "password",
        errorName: new MissingParamError("password").message,
      },
    ];
    expect(res).toEqual(expectedResult);
  });
  test("should validate empty fields and email with sucess", async () => {
    const res = await sut.validateSignUp({
      email: "testing.com",
      password: "",
    });

    const expectedResult: IValidation.Result = [
      {
        error: true,
        fieldName: "email",
        errorName: new InvalidEmailError().name,
      },
      {
        error: true,
        fieldName: "password",
        errorName: new MissingParamError("password").message,
      },
    ];
    expect(res).toEqual(expectedResult);
  });
  test("should validate unique field", async () => {
    const res = await sut.validateSignUp({
      email: "testing@hotmail.com",
      password: "",
    });

    const expectedResult: IValidation.Result = {
      error: true,
      fieldName: "password",
      errorName: new MissingParamError("password").message,
    };

    expect(res).toEqual(expectedResult);
  });
  test("should not validate, because not ocurred erros", async () => {
    const res = await sut.validateSignUp({
      email: "testing@hotmail.com",
      password: "testingpassword",
    });

    const expectedResult: IValidation.Result = true;

    expect(res).toEqual(expectedResult);
  });
});
