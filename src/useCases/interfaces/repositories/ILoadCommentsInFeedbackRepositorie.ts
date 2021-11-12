import { ILoadTotalUpvotedInCommentRepositorie } from ".";
import { ILoadPreviewUserRepositorie } from "./ILoadPreviewUserRepositorie";

export interface ILoadCommentsInFeedbackRepositorie {
  load: (
    params: ILoadCommentsInFeedbackRepositorie.Params
  ) => Promise<ILoadCommentsInFeedbackRepositorie.Result[]>;
}

export namespace ILoadCommentsInFeedbackRepositorie {
  export type Params = {
    feedbackId: string;
    index: number;
    repliesByComment?: string;
  };
  export type Result = {
    id: string;
    message: string;
    user: ILoadPreviewUserRepositorie.Result;
    upvotes: ILoadTotalUpvotedInCommentRepositorie.Result;
  };
}
