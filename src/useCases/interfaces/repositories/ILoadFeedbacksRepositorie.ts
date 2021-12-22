import {
  ILoadPreviewUserRepositorie,
  ILoadTotalCommentsInFeedbackRepositorie,
  ILoadTotalUpvotedInFeedbackRepositorie,
} from ".";

export interface ILoadFeedbacksRepositorie {
  load(page: number): Promise<ILoadFeedbacksRepositorie.Result[]>;
}

export namespace ILoadFeedbacksRepositorie {
  export type Result = {
    id: string;
    message: string;
    musicOrAlbumId: string;
    user: ILoadPreviewUserRepositorie.Result;
    comments: ILoadTotalCommentsInFeedbackRepositorie.Result;
    upvotes: ILoadTotalUpvotedInFeedbackRepositorie.Result;
  };
}
