import Music from "./value-objects/Music";
import Album from "./value-objects/Album";
import { UUID } from "./value-objects/UUID";
import Upvote from "./upvote";
import { User } from "./user";
import { Comment } from "./comment";
import { Message } from "./value-objects/Message";
import { InvalidMessageError } from "./errors/InvalidMessage";

export namespace Feedback {
  export type Id = UUID.Value;
  export type Params = {
    userId: User.Id;
    message: string;
    feedbackHas: Music | Album;
  };
}

// type FeedbackConstructor = {
//   id: IUUID.Value;
//   userId: IUser.Id;
//   message: string;
//   feedbackHas: Music | Album;
// };

export class Feedback {
  readonly id: UUID.Value;
  readonly userId: User.Id;
  message: Message.Value;
  feedbackHas: Music | Album;
  upvotes: Upvote[];
  comments: Comment[];

  private constructor({
    userId,
    message,
    feedbackHas,
    id,
    comments,
    upvotes,
  }: Feedback) {
    this.userId = userId;
    this.message = message;
    this.feedbackHas = feedbackHas;
    this.id = id;
    this.upvotes = upvotes;
    this.comments = comments;
  }

  static create({ message, feedbackHas, userId }: Feedback.Params): Feedback {
    const id = UUID.create();
    const messageOrError = Message.create(message);
    if (!(messageOrError instanceof Message)) throw messageOrError;
    return new Feedback({
      id: id.value,
      feedbackHas,
      message: messageOrError.value,
      userId,
      upvotes: [],
      comments: [],
    });
  }

  // private appendUpvote(upvote) {}
  // private appendComment(comment) {}
}
