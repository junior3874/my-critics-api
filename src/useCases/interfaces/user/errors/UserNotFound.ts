export class UserNotFound extends Error {
  constructor() {
    super("this user not found");
    this.name = "UserNotFound";
  }
}
