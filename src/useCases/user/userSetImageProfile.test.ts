import { ISaveUserImageUrlRepositorie } from "@/useCases/interfaces/repositories/ISaveUserImageUrlRepositorie";
import { ISaveUserProfileImageService } from "@/useCases/interfaces/services/ISaveUserProfileImageService";
import { mock } from "jest-mock-extended";

import UserSetImageProfile from "./userSetImageProfile";

import IInspectImage from "@/useCases/interfaces/fileHelper/IInspectImage";
import { OcurredUnknownErrorInService } from "../interfaces/user/errors/OcurredUnknowErrorInService";
import { UserImageInvalid } from "../interfaces/user/errors/UserImageInvalid";

describe("#userSetImageProfile", () => {
  const makeSut = () => {
    const verifyImageHasAccepted = mock<IInspectImage>();
    const saveImageService = mock<ISaveUserProfileImageService>();
    const saveUserImageUrl = mock<ISaveUserImageUrlRepositorie>();
    const sut = new UserSetImageProfile(
      verifyImageHasAccepted,
      saveImageService,
      saveUserImageUrl
    );

    return {
      sut,
      verifyImageHasAccepted,
      saveImageService,
      saveUserImageUrl,
    };
  };

  test("should set image profile url", async () => {
    const { sut, saveImageService, saveUserImageUrl } = makeSut();

    const file = Buffer.from("string test");
    const mockExpectedUrl = "www.abc/1";
    saveImageService.save.mockResolvedValue(mockExpectedUrl);

    const res = await sut.save({
      userId: "1",
      image: { file, format: "jpg", name: "testing", size: 1545 },
    });

    expect(saveImageService.save).toHaveBeenCalledWith(file);
    expect(saveUserImageUrl.save).toHaveBeenCalledWith("1", mockExpectedUrl);
    expect(res).toEqual(mockExpectedUrl);
  });

  test("should not set image, because ocurred any error", async () => {
    const { sut, saveImageService, saveUserImageUrl } = makeSut();

    const file = Buffer.from("string test");

    saveImageService.save.mockImplementation(() => {
      throw new OcurredUnknownErrorInService();
    });
    try {
      await sut.save({
        userId: "1",
        image: { file, format: "jpg", name: "testing", size: 1545 },
      });
      expect(true).toEqual(false);
    } catch (err) {
      expect(err).toBeInstanceOf(OcurredUnknownErrorInService);
    }
  });
  test("should not set image, because format or any data is invalid", async () => {
    const { sut, verifyImageHasAccepted } = makeSut();

    const file = Buffer.from("string test");

    verifyImageHasAccepted.inspect.mockResolvedValue(true);
    try {
      await sut.save({
        userId: "1",
        image: { file, format: "jpg", name: "testing", size: 1545 },
      });

      expect(true).toEqual(false);
    } catch (err) {
      expect(err).toBeInstanceOf(UserImageInvalid);
    }
  });
});
