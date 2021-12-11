export interface IUpdateUpvoteRepositorie {
  update(data: IUpdateUpvoteRepositorie.Params): Promise<void>;
}

export namespace IUpdateUpvoteRepositorie {
  export type Params = {
    upvoteId: string;
    userId: number;
    type: boolean;
  };
}
