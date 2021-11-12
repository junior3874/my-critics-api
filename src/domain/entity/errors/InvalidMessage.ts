export class InvalidMessageError extends Error implements DomainError {
  constructor() {
    super(`The message is invalid.`);
    this.name = "InvalidMessageError";
  }
}
