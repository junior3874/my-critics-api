import { Comment } from "./comment";
import { Feedback } from "./feedback";
import { User } from "./user";
import { UUID } from "./value-objects/UUID";

export namespace IUpvote {
  export type Params = {
    type: boolean;
    upvoteBelongsToEntityId: Comment.Id | Feedback.Id;
    userId: User.Id;
  };
}
export interface IUpvote {}
export default class Upvote {
  readonly id: UUID.Value;
  type: boolean;
  upvoteBelongsToEntityId: Comment.Id | Feedback.Id;
  userId: User.Id;

  private constructor({ id, type, upvoteBelongsToEntityId, userId }: Upvote) {
    this.id = id;
    this.type = type;
    this.upvoteBelongsToEntityId = upvoteBelongsToEntityId;
    this.userId = userId;
  }

  static create({ type, upvoteBelongsToEntityId, userId }: IUpvote.Params) {
    const id = UUID.create();
    return new Upvote({ id: id.value, type, upvoteBelongsToEntityId, userId });
  }
}
