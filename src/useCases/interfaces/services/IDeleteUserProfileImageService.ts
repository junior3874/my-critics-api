export interface IDeleteUserProfileImageService {
  delete: (image: string) => Promise<void>;
}
