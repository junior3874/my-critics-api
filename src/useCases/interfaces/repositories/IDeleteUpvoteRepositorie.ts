export interface IDeleteUpvoteRepositorie {
  delete(upvoteId: string): Promise<void>;
}
