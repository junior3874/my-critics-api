import Hash from "@/domain/entity/types/Hash";

export interface ILoadUserByEmailRepositorie {
  load: (
    email: string
  ) => Promise<ILoadUserByEmailRepositorie.Result | undefined>;
}

namespace ILoadUserByEmailRepositorie {
  export type Result = {
    id: string;
    password: Hash;
  };
}
