import { UpvoteNotFoundError } from "../errors/UpvoteNotFoundError";
import { IDeleteUpvoteRepositorie } from "../interfaces/repositories/IDeleteUpvoteRepositorie";
import { IFindUpvoteRepositorie } from "../interfaces/repositories/IFindUpvoteRepositorie";
import { IDeleteUpvoteUseCase } from "../interfaces/upvote/IDeleteUpvoteUseCase";

export class DeleteUpvoteUseCase implements IDeleteUpvoteUseCase {
  constructor(
    private readonly findUpvoteRepositorie: IFindUpvoteRepositorie,
    private readonly deleteUpvoteRepositorie: IDeleteUpvoteRepositorie
  ) {}
  async delete(data: IDeleteUpvoteUseCase.Params): Promise<void> {
    const findUpvote = await this.findUpvoteRepositorie.find(
      data.upvoteId,
      data.userId
    );
    if (!findUpvote) throw new UpvoteNotFoundError();

    await this.deleteUpvoteRepositorie.delete(data.upvoteId);
    return;
  }
}
