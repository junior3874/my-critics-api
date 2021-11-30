import { ISaveFeedbackUseCase } from "@/useCases/interfaces/feedback/ISaveFeedbackUseCase";

export interface ISaveFeedbackRepositorie {
  save: (data: ISaveFeedbackRepositorie.Params) => Promise<void>;
}

export namespace ISaveFeedbackRepositorie {
  export type Params = {
    id: string;
    message: string;
    musicOrAlbumId: string;
    type: "album" | "track";
    userId: string;
  };
}
