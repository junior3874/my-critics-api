export interface IValidation<FieldsProps> {
  validateSignUp: (fields: FieldsProps) => Promise<IValidation.Result>;
}

export namespace IValidation {
  type error = {
    error: boolean;
    fieldName: string;
    errorName: string;
  };
  export type Result = Array<error> | error;
}
