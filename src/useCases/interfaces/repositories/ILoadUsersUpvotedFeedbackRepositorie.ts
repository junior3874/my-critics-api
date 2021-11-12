import { ILoadPreviewUser } from "./ILoadPreviewUserRepositorie";

export interface ILoadUsersUpvotedInFeedbackRepositorie {
  load: (
    id: number,
    page: number
  ) => Promise<ILoadUsersUpvotedInFeedbackRepositorie.Result>;
}

export namespace ILoadUsersUpvotedInFeedbackRepositorie {
  export type Result = ILoadPreviewUser.Result;
}
