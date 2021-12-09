import Upvote from "@/domain/entity/upvote";
import { ISaveUpvoteRepositorie } from "../interfaces/repositories/ISaveUpvoteRepositorie";
import { IVerifyUserHasUpvotedRepositorie } from "../interfaces/repositories/IVerifyUserHasUpvotedRepositorie";
import { ISaveUpvoteUseCase } from "../interfaces/upvote/ISaveUpvoteUseCase";

export class SaveUpvoteUseCase implements ISaveUpvoteUseCase {
  constructor(
    private readonly verifyUserHasUpvotred: IVerifyUserHasUpvotedRepositorie,
    private readonly saveUpvoteRepositorie: ISaveUpvoteRepositorie
  ) {}
  async save(
    data: ISaveUpvoteUseCase.Params
  ): Promise<ISaveUpvoteUseCase.Result> {
    const createUpvote = Upvote.create({
      type: data.type,
      upvoteBelongsToEntityId: data.entityId,
      userId: data.userId as unknown as string,
    });

    await this.saveUpvoteRepositorie.save({
      date: new Date(),
      userId: data.userId,
      type: createUpvote.type,
      upvoteId: createUpvote.id,
      upvoteBelongsToEntityId: data.entityId,
    });

    return { id: createUpvote.id, type: createUpvote.type };
  }
}
