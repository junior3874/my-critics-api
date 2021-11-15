import { OcurredUnknownErrorInService } from "@/useCases/interfaces/user/errors/OcurredUnknowErrorInService";

export interface ISaveUserProfileImageService {
  save: (image: Buffer) => Promise<string | OcurredUnknownErrorInService>;
}
