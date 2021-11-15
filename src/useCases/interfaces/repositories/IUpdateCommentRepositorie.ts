export interface IUpdateCommentRepositorie {
  update: (data: IUpdateCommentRepositorie.Params) => Promise<void>;
}

export namespace IUpdateCommentRepositorie {
  export type Params = {
    commentId: string;
    message: string;
  };
}
