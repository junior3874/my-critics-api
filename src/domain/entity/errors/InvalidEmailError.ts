export class InvalidEmailError extends Error implements DomainError {
  constructor() {
    super(`The email is invalid.`);
    this.name = "InvalidEmailError";
  }
}
