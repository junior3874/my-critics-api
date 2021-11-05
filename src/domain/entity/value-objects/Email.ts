import { InvalidEmailError } from "../errors/InvalidEmailError";
import { UniqueString } from "../types/UniqueString";

export default class Email {
  private readonly email: UniqueString;

  private constructor(email: string) {
    this.email = email;
    Object.freeze(this);
  }

  static create(email: string): Email | InvalidEmailError {
    if (!Email.validate(email)) {
      return new InvalidEmailError(email);
    }
    return new Email(email);
  }

  get value(): Email {
    return this.email as unknown as Email;
  }

  static validate(email: string): boolean {
    var tester =
      /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (!email) {
      return false;
    }
    if (email.length > 256) {
      return false;
    }
    if (!tester.test(email)) {
      return false;
    }
    var [account, address] = email.split("@");
    if (account.length > 64) {
      return false;
    }
    var domainParts = address.split(".");
    if (
      domainParts.some(function (part) {
        return part.length > 63;
      })
    ) {
      return false;
    }
    return true;
  }
}
