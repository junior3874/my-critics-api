import { InvalidMessageError } from "@/domain/entity/errors/InvalidMessage";

export interface ISaveFeedbackUseCase {
  save: (
    data: ISaveFeedbackUseCase.Params
  ) => Promise<void | InvalidMessageError>;
}

export namespace ISaveFeedbackUseCase {
  export type Params = {
    userId: number;
    message: string;
    musicOrAlbumId: string;
    type: "album" | "track";
  };
}
