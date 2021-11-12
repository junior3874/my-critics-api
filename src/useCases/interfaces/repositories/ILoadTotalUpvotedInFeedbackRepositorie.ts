export interface ILoadTotalUpvotedInFeedbackRepositorie {
  load: (id: number) => Promise<ILoadTotalUpvotedInFeedbackRepositorie.Result>;
}

export namespace ILoadTotalUpvotedInFeedbackRepositorie {
  export type Result = {
    positives: number;
    negatives: number;
  };
}
