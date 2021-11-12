export interface ICheckUsernameRepositorie {
  check: (username: string) => Promise<boolean>;
}
