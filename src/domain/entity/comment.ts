import Feedback, { IFeedback } from "./feedback";
import User, { IUser } from "./user";
import UUID from "./value-objects/UUID";

type CommentConctructorDTO = {
  id: UUID;
  userId: IUser.Id;
  feedbackId: IFeedback.Id;
  message: string;
};

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
  readonly id: UUID;
  readonly userId: IUser.Id;
  readonly feedbackId: IFeedback.Id;
  message: string;

  constructor({ id, feedbackId, userId, message }: CommentConctructorDTO) {
    this.id = id;
    this.feedbackId = feedbackId;
    this.userId = userId;
    this.message = message;
  }

  static create({ feedbackId, message, userId }: IComment.Params) {
    const id = UUID.create();

    return new Comment({ id, feedbackId, message, userId });
  }
}
