export interface ILoadTotalCommentsInFeedbackRepositorie {
  load: (id: number) => Promise<ILoadTotalCommentsInFeedbackRepositorie.Result>;
}

export namespace ILoadTotalCommentsInFeedbackRepositorie {
  export type Result = number;
}
