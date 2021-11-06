export class UserImageInvalid extends Error {
  constructor() {
    super("this image is invalid");
    this.name = "UserImageInvalid";
  }
}
