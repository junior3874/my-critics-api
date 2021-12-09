export interface IVerifyUserHasUpvotedRepositorie {
  verify(userId: number, feedbackId: string): Promise<boolean>;
}
