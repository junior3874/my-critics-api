import { InvalidMessageError } from "@/domain/entity/errors/InvalidMessage";

export interface ISaveCommentUseCase {
  save: (
    data: ISaveCommentUseCase.Params
  ) => Promise<ISaveCommentUseCase.Result | InvalidMessageError>;
}

export namespace ISaveCommentUseCase {
  export type Params = {
    userId: string;
    message: string;
    feedbackId: string;
    repliesByComment?: string;
  };

  export type Result = {
    id: string;
    message: string;
  };
}
