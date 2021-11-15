import { Comment } from "@/domain/entity/comment";
import { ISaveCommentUseCase } from "../interfaces/comment/ISaveCommentUseCase";
import { ISaveCommentRepositorie } from "../interfaces/repositories/ISaveCommentRepositorie";

export default class CommentCreateUseCase implements ISaveCommentUseCase {
  constructor(
    private readonly saveCommentRepositorie: ISaveCommentRepositorie
  ) {}
  async save(
    data: ISaveCommentUseCase.Params
  ): Promise<ISaveCommentUseCase.Result> {
    const creatingComment = Comment.create(data);

    await this.saveCommentRepositorie.save({
      ...creatingComment,
    });

    return { message: creatingComment.message, id: creatingComment.id };
  }
}
