export interface IFindUpvoteRepositorie {
  find(
    upvoteId: string,
    userId: number
  ): Promise<IFindUpvoteRepositorie.Result | undefined>;
}

export namespace IFindUpvoteRepositorie {
  export type Result = {
    id: string;
    userId: number;
    type: boolean;
    entityBelongsToId: string | number;
  };
}
