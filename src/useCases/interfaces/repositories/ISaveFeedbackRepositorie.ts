import UUID from "@/domain/entity/value-objects/UUID";
import { ISaveFeedbackUseCase } from "@/useCases/interfaces/feedback/ISaveFeedbackUseCase";

export interface ISaveFeedbackRepositorie {
  save: (data: ISaveFeedbackRepositorie.Params) => Promise<void>;
}

export namespace ISaveFeedbackRepositorie {
  export type Params = {
    id: string;
    message: string;
    musicOrAlbumUrl: string;
    userId: string;
  };
}
