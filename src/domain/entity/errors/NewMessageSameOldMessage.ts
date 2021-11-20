export class NewMessageSameOldMessage extends Error {
  constructor() {
    super(`The message is equals old message.`);
    this.name = "NewMessageSameOldMessage";
  }
}
