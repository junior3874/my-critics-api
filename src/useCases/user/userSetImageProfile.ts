import IInspectImage from "@/useCases/interfaces/fileHelper/IInspectImage";
import { ISaveUserImageUrlRepositorie } from "@/useCases/interfaces/repositories/ISaveUserImageUrlRepositorie";
import { ISaveUserProfileImageService } from "@/useCases/interfaces/services/ISaveUserProfileImageService";
import { OcurredUnknownErrorInService } from "../interfaces/user/errors/OcurredUnknowErrorInService";
import { UserImageInvalid } from "../interfaces/user/errors/UserImageInvalid";
import { IUserSetImageProfileUseCase } from "../interfaces/user/IUserSetImageProfileUseCase";

export default class UserSetImageProfile
  implements IUserSetImageProfileUseCase
{
  constructor(
    private readonly inspectImage: IInspectImage,
    private readonly saveImageService: ISaveUserProfileImageService,
    private readonly saveUserImageUrl: ISaveUserImageUrlRepositorie
  ) {}
  async save({
    userId,
    image,
  }: IUserSetImageProfileUseCase.Params): Promise<
    string | OcurredUnknownErrorInService | UserImageInvalid
  > {
    const validImage = await this.inspectImage.inspect(image);
    if (validImage) throw new UserImageInvalid();
    const imageUrl = await this.saveImageService.save(image.file);
    await this.saveUserImageUrl.save(userId, imageUrl as string);
    return imageUrl as string;
  }
}
