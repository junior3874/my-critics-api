export interface IUserLoadByTokenUseCase {
  load: (acessToken: string) => Promise<IUserLoadByTokenUseCase.Result>;
}

export namespace IUserLoadByTokenUseCase {
  export type Result = {
    id: string;
  };
}
