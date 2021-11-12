export interface ILoadUserEssentialsDataRepositorie {
  load: (id: string) => Promise<ILoadUserByEmailRepositorie.Result>;
}

namespace ILoadUserByEmailRepositorie {
  export type Result = {
    name: string;
    username: string;
    userImageProfileUrl: string;
    email: string;
  };
}
