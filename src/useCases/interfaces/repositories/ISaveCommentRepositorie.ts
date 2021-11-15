import { string } from "yup/lib/locale";
import { ISaveFeedbackRepositorie } from ".";

export interface ISaveCommentRepositorie {
  save(params: ISaveCommentRepositorie.Params): Promise<void>;
}

export namespace ISaveCommentRepositorie {
  export type Params = {
    message: string;
    userId: string;
    feedbackId: string;
    repliesByComment?: string;
  };
}
