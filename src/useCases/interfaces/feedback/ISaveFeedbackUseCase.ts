import { IFeedback } from "@/domain/entity/feedback";

export interface ISaveFeedbackUseCase {
  save: (data: ISaveFeedbackUseCase.Params) => Promise<void>;
}

export namespace ISaveFeedbackUseCase {
  export type Params = {
    userId: string;
    message: string;
    musicOrAlbumUrl: string;
  };
}
