import { UserSignInController } from "@/presentation/controllers/user";
import { IValidation } from "../presentation/interfaces/IValidation";
import * as yup from "yup";
import { MissingParamError } from "@/presentation/errors";
import { InvalidEmailError } from "@/domain/entity/errors/InvalidEmailError";

const errors = {
  ["required"]: (paramName: string) => new MissingParamError(paramName).message,
  ["email"]: new InvalidEmailError().name,
};
const types = ["email", "required"];

export class YupAdapter {
  async validateSignUp(
    fields: UserSignInController.Request
  ): Promise<IValidation.Result> {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required().min(8).max(16),
    });

    const err = await errAdapter(fields, schema);
    return err as IValidation.Result;
  }
}

async function errAdapter(fields, schema): Promise<IValidation.Result> {
  const res: IValidation.Error[] = [];

  await schema
    .validate(fields, { abortEarly: false })
    .then((_) => true)
    .catch((err) => {
      err.inner.map((err) => {
        if (!types.includes(err.type)) return;
        const objectError: IValidation.Result = {
          error: true,
          fieldName: err.path,
          errorName:
            err.type === "email"
              ? errors[`email`]
              : errors[`required`](err.path),
        };
        res.push(objectError);
      });
    });

  if (res.length === 0) return true;

  return res.length === 1 ? res[0] : res;
}
