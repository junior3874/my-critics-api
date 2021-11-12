import { ILoadTotalUpvotedInCommentRepositorie } from ".";
import { ILoadPreviewUserRepositorie } from "./ILoadPreviewUserRepositorie";

export interface ILoadCommentsInFeedbackRepositorie {
  load: (
    feedbackId: string,
    page: number
  ) => Promise<ILoadCommentsInFeedbackRepositorie.Result[]>;
}

export namespace ILoadCommentsInFeedbackRepositorie {
  export type Result = {
    id: string;
    message: string;
    user: ILoadPreviewUserRepositorie.Result;
    upvotes: ILoadTotalUpvotedInCommentRepositorie.Result;
  };
}
