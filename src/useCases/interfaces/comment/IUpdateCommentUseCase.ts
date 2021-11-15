import { InvalidMessageError } from "@/domain/entity/errors/InvalidMessage";

export interface IUpdateCommentUseCase {
  update: (
    data: IUpdateCommentUseCase.Params
  ) => Promise<IUpdateCommentUseCase.Result | InvalidMessageError>;
}

export namespace IUpdateCommentUseCase {
  export type Params = {
    userId: string;
    message: string;
    commentId: string;
  };

  export type Result = {
    message: string;
  };
}
