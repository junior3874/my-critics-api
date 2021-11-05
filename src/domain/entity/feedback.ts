import Music from "./value-objects/Music";
import Album from "./value-objects/Album";
import UUID from "./value-objects/UUID";
import Upvote from "./upvote";
import { IUser } from "./user";

type FeedbackContructorDTO = {
  userId: IUser.Id;
  message: string;
  feedbackHas: Music | Album;
  id: UUID;
};

export namespace IFeedback {
  export type Id = UUID;
  export type Params = {
    userId: IUser.Id;
    message: string;
    feedbackHas: Music | Album;
  };
}

export default class Feedback {
  readonly id: UUID;
  readonly userId: IUser.Id;
  message: string;
  feedbackHas: Music | Album;
  upvotes: Upvote[];

  private constructor({
    userId,
    message,
    feedbackHas,
    id,
  }: FeedbackContructorDTO) {
    this.userId = userId;
    this.message = message;
    this.feedbackHas = feedbackHas;
    this.id = id;
    this.upvotes = [];
  }

  static create({
    message,
    feedbackHas,
    userId,
  }: IFeedback.Params): IFeedback.Params {
    const id = UUID.create();
    return new Feedback({ id, feedbackHas, message, userId });
  }
}
