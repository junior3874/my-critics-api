export interface ISaveCommentUseCase {
  save: (
    data: ISaveCommentUseCase.Params
  ) => Promise<ISaveCommentUseCase.Params>;
}

export namespace ISaveCommentUseCase {
  export type Params = {
    userId: string;
    message: string;
    feedbackId: string;
  };

  export type Result = {
    id: string;
    message: string;
  };
}
