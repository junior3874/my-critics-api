import Album from "@/domain/entity/value-objects/Album";
import Music from "@/domain/entity/value-objects/Music";
import {
  ILoadPreviewUserRepositorie,
  ILoadTotalCommentsInFeedbackRepositorie,
  ILoadTotalUpvotedInFeedbackRepositorie,
} from ".";

export interface ILoadFeedbacksRepositorie {
  load(feedbackId: string): Promise<ILoadFeedbacksRepositorie.Result>;
}

export namespace ILoadFeedbacksRepositorie {
  export type Result = {
    id: string;
    message: string;
    musicOrAlbum: Music | Album;
    user: ILoadPreviewUserRepositorie.Result;
    comments: ILoadTotalCommentsInFeedbackRepositorie.Result;
    upvotes: ILoadTotalUpvotedInFeedbackRepositorie.Result;
  };
}
