import Music from "./value-objects/Music";
import Album from "./value-objects/Album";
import UUID, { IUUID } from "./value-objects/UUID";
import Upvote from "./upvote";
import { IUser } from "./user";

export namespace IFeedback {
  export type Id = UUID;
  export type Params = {
    userId: IUser.Id;
    message: string;
    feedbackHas: Music | Album;
  };
}

export default class Feedback {
  readonly id: IUUID.Value;
  readonly userId: IUser.Id;
  message: string;
  feedbackHas: Music | Album;

  private constructor({ userId, message, feedbackHas, id }: Feedback) {
    this.userId = userId;
    this.message = message;
    this.feedbackHas = feedbackHas;
    this.id = id;
  }

  static create({ message, feedbackHas, userId }: IFeedback.Params): Feedback {
    const id = UUID.create();
    return new Feedback({ id: id.value, feedbackHas, message, userId });
  }
}
