import { ISaveFeedbackUseCase } from "../feedback/ISaveFeedbackUseCase";

export interface ICreateUpvoteUseCase {
  save: (
    data: ICreateUpvoteUseCase.Params
  ) => Promise<ICreateUpvoteUseCase.Params>;
}

export namespace ICreateUpvoteUseCase {
  export type Params = {
    userId: string;
    message: string;
    feedbackId: string;
  };

  export type Result = {
    id: string;
    message: string;
  };
}
