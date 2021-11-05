import { InvalidEmailError } from "../errors/InvalidEmailError";
import Email from "./Email";

describe("email value object", () => {
  test("should create email with sucess", () => {
    const res = Email.create("testing@hotmail.com");
    expect(res).toBeInstanceOf(Email);
  });

  test("should NOT create email, because this email is wrong", () => {
    const res = Email.create("testing@testing");
    expect(res).toBeInstanceOf(InvalidEmailError);
  });
});
