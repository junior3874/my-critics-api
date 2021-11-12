import { InvalidMessageError } from "./errors/InvalidMessage";
import Feedback, { IFeedback } from "./feedback";
import User, { IUser } from "./user";
import { Message } from "./value-objects/Message";
import UUID, { IUUID } from "./value-objects/UUID";

export namespace IComment {
  export type Params = {
    userId: IUser.Id;
    feedbackId: IFeedback.Id;
    message: string;
  };

  export type Id = UUID;
}

export type CommentId = string;
export default class Comment {
  readonly id: IUUID.Value;
  readonly userId: IUser.Id;
  readonly feedbackId: IFeedback.Id;
  message: Message.Value;

  constructor({ id, feedbackId, userId, message }: Comment) {
    this.id = id;
    this.feedbackId = feedbackId;
    this.userId = userId;
    this.message = message;
  }

  static create({ feedbackId, message, userId }: IComment.Params): Comment {
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
}
