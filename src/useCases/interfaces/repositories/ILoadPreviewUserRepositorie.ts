export interface ILoadPreviewUserRepositorie {
  load: (id: number) => Promise<ILoadPreviewUserRepositorie.Result>;
}

export namespace ILoadPreviewUserRepositorie {
  export type Result = {
    id: string;
    name: string;
    username: string;
    imageProfileUrl: string;
  };
}
