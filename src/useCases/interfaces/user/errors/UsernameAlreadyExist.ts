export class UsernameAlreadyExist extends Error {
  constructor() {
    super("this username already exist");
    this.name = "UsernameAlreadyExist";
  }
}
