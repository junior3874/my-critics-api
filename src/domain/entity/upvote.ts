import { CommentId } from "./comment";
import { IFeedback } from "./feedback";
import { IUser } from "./user";
import UUID from "./value-objects/UUID";

export namespace IUpvote {
  export type Params = {
    type: boolean;
    upvoteBelongsToEntityId: CommentId | IFeedback.Id;
    userId: IUser.Id;
  };
}
export interface IUpvote {}
export default class Upvote {
  readonly id: UUID;
  type: boolean;
  upvoteBelongsToEntityId: CommentId | IFeedback.Id;
  userId: IUser.Id;

  private constructor({ id, type, upvoteBelongsToEntityId, userId }: Upvote) {
    this.id = id;
    this.type = type;
    this.upvoteBelongsToEntityId = upvoteBelongsToEntityId;
    this.userId = userId;
  }

  static create({ type, upvoteBelongsToEntityId, userId }: IUpvote.Params) {
    const id = UUID.create();
    return new Upvote({ id, type, upvoteBelongsToEntityId, userId });
  }
}
