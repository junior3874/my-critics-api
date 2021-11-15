import { CommentDontExist } from "@/presentation/errors";

export interface IDeleteCommentRepositorie {
  delete(userId: string, commentId: string): Promise<void | CommentDontExist>;
}
