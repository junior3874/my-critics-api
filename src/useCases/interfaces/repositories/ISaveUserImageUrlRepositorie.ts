export interface ISaveUserImageUrlRepositorie {
  save: (userId: string, imageUrl: string) => Promise<void>;
}
