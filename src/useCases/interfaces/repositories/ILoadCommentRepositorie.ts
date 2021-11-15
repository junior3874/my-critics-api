import { Comment } from "@/domain/entity/comment";
import { CommentDontExist } from "@/presentation/errors";

export interface ILoadCommentRepositorie {
  load(commentId: string): Promise<ILoadCommentRepositorie.Result | void>;
}

export namespace ILoadCommentRepositorie {
  export type Result = {
    id: string;
    userId: string;
    message: string;
    feedbackId: string;
  };
}
