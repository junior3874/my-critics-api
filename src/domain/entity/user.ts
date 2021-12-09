import { InvalidEmailError } from "./errors/InvalidEmailError";
import Hash from "./types/Hash";
import { Email } from "./value-objects/Email";

export namespace User {
  export type Params = {
    email: string;
    password: string;
    name: string;
    username: string;
  };

  export type Id = Email.Value;
}

export class User {
  readonly email: Email.Value;
  password: string;
  name: string;
  username: string;
  userImageProfileUrl: string;

  private constructor({
    name,
    email,
    password,
    username,
    userImageProfileUrl,
  }: User) {
    this.email = email;
    this.name = name;
    this.password = password;
    this.username = username;
    this.userImageProfileUrl = userImageProfileUrl;
  }

  static create({
    email,
    name,
    password,
    username,
  }: User.Params): User | InvalidEmailError {
    const emailOrError = Email.create(email);
    if (!(emailOrError instanceof Email)) {
      throw emailOrError;
    }

    return new User({
      email: emailOrError.value,
      name,
      password,
      username,
      userImageProfileUrl: "",
    });
  }
}
