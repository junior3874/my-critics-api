export interface IDeleteUpvoteRepositorie {
  delete(upvoteId: string, userId: number): Promise<void>;
}
