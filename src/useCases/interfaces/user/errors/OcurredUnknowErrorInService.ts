export class OcurredUnknownErrorInService extends Error {
  constructor() {
    super(`Ocurred unknown error in service`);
    this.name = "OcurredUnknownErrorInService";
  }
}
