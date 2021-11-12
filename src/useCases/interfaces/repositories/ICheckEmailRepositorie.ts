export interface ICheckEmailRepositorie {
  check: (email: string) => Promise<boolean>;
}
