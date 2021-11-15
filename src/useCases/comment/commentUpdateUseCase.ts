import { Comment } from "@/domain/entity/comment";
import { InvalidMessageError } from "@/domain/entity/errors/InvalidMessage";
import { NewMessageSameOldMessage } from "@/domain/entity/errors/NewMessageSameOldMessage";
import { CommentDontExist } from "@/presentation/errors";
import { IUpdateCommentUseCase } from "../interfaces/comment/IUpdateCommentUseCase";
import { ILoadCommentRepositorie } from "../interfaces/repositories/ILoadCommentRepositorie";
import { IUpdateCommentRepositorie } from "../interfaces/repositories/IUpdateCommentRepositorie";

export class UpdateCommentUseCase implements IUpdateCommentUseCase {
  constructor(
    private readonly loadCommentRepositorie: ILoadCommentRepositorie,
    private readonly updateCommentRepositorie: IUpdateCommentRepositorie
  ) {}
  async update(
    data: IUpdateCommentUseCase.Params
  ): Promise<
    | IUpdateCommentUseCase.Result
    | InvalidMessageError
    | NewMessageSameOldMessage
  > {
    const loadComment = await this.loadCommentRepositorie.load(data.commentId);
    if (!loadComment) throw new CommentDontExist();

    const creatingComment = new Comment(loadComment);

    creatingComment.updateMessage(data.message);

    await this.updateCommentRepositorie.update({
      commentId: creatingComment.id,
      message: creatingComment.message,
    });
    return { message: creatingComment.message };
  }
}
