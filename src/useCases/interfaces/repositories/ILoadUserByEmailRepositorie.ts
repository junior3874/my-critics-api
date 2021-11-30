import Hash from "@/domain/entity/types/Hash";

export interface ILoadUserByEmailRepositorie {
  load: (
    email: string
  ) => Promise<ILoadUserByEmailRepositorie.Result | undefined>;
}

export namespace ILoadUserByEmailRepositorie {
  export type Result = {
    id: number;
    password: string;
  };
}
