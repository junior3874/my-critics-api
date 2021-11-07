import { UserSignInController } from "@/presentation/controllers/user";
import { IValidation } from "./IValidation";

export class IUserSignUpValidator
  implements IValidation<UserSignInController.Request>
{
  validateSignUp: (
    fields: UserSignInController.Request
  ) => Promise<IValidation.Result>;
}
