export interface ILoadTotalUpvotedInCommentRepositorie {
  load: (id: number) => Promise<ILoadTotalUpvotedInCommentRepositorie.Result>;
}

export namespace ILoadTotalUpvotedInCommentRepositorie {
  export type Result = {
    positives: number;
    negatives: number;
  };
}
