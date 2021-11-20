import { InvalidMessageError } from "./errors/InvalidMessage";
import { NewMessageSameOldMessage } from "./errors/NewMessageSameOldMessage";
import Feedback, { IFeedback } from "./feedback";
import User, { IUser } from "./user";
import { Message } from "./value-objects/Message";
import { UUID } from "./value-objects/UUID";

export namespace Comment {
  export type Params = {
    userId: IUser.Id;
    feedbackId: IFeedback.Id;
    message: string;
  };

  export type Id = UUID;

  export type Constructor = {
    id: UUID.Value;
    userId: IUser.Id;
    feedbackId: IFeedback.Id;
    message: Message.Value;
  };
}

export type CommentId = string;
export class Comment {
  readonly id: UUID.Value;
  readonly userId: IUser.Id;
  readonly feedbackId: IFeedback.Id;
  public message: Message.Value;

  constructor({ id, feedbackId, userId, message }: Comment.Constructor) {
    this.id = id;
    this.feedbackId = feedbackId;
    this.userId = userId;
    this.message = message;
  }

  static create({ feedbackId, message, userId }: Comment.Params): Comment {
    const id = UUID.create();
    const messageOrError = Message.create(message);
    if (!(messageOrError instanceof Message)) throw messageOrError;
    return new Comment({
      id: id.value,
      feedbackId,
      message: messageOrError.value,
      userId,
    });
  }

  updateMessage(newMessage: Message.Value) {
    const messageOrError = Message.create(newMessage);
    if (!(messageOrError instanceof Message)) throw messageOrError;
    if (messageOrError.value === this.message) {
      throw new NewMessageSameOldMessage();
    }

    this.message = messageOrError.value;
  }
}
