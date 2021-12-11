export interface ISaveUpvoteUseCase {
  save: (data: ISaveUpvoteUseCase.Params) => Promise<ISaveUpvoteUseCase.Result>;
}

export namespace ISaveUpvoteUseCase {
  export type Params = {
    userId: number;
    entityId: string;
    type: boolean;
  };
  export type Result = {
    id: string;
    type: boolean;
  };
}
