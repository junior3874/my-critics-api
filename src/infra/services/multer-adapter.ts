import { ISaveUserProfileImageService } from "@/useCases/interfaces/services/ISaveUserProfileImageService";

export default class MulterAdapter implements ISaveUserProfileImageService {
  save: (image: Buffer) => Promise<string>;
}
