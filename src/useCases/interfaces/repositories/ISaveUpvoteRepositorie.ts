export interface ISaveUpvoteRepositorie {
  save(
    data: ISaveUpvoteRepositorie.Params
  ): Promise<ISaveUpvoteRepositorie.Result>;
}

export namespace ISaveUpvoteRepositorie {
  export type Params = {
    userId: number;
    upvoteId: string;
    date: Date;
    type: boolean;
    upvoteBelongsToEntityId: string | number;
  };
  export type Result = boolean;
}
