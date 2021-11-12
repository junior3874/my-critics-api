import { InvalidMessageError } from "../errors/InvalidMessage";

export namespace Message {
  export type Value = string;
}
export class Message {
  value: Message.Value;

  constructor(message: Message.Value) {
    this.value = message;
  }

  static create(message: Message.Value): Message | InvalidMessageError {
    const tratedMessage = message.trim();
    if (validation(tratedMessage)) new InvalidMessageError();
    return new Message(tratedMessage);
  }
}

function validation(message: Message.Value): boolean {
  const tratedMessage = message.trim();
  if (!tratedMessage) return true;
  return false;
}
