import { OcurredUnknownErrorInService } from "./errors/OcurredUnknowErrorInService";

export interface IUserSetImageProfileUseCase {
  save: (
    data: IUserSetImageProfileUseCase.Params
  ) => Promise<string | OcurredUnknownErrorInService>;
}

export namespace IUserSetImageProfileUseCase {
  export type Image = {
    file: Buffer;
    size: number;
    name: string;
    format: string;
  };
  export type Params = {
    userId: string;
    image: Image;
  };
}
