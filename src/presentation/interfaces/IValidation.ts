export interface IValidation<FieldsProps> {
  validate: (fields: FieldsProps) => Promise<IValidation.Result>;
}

export namespace IValidation {
  export type Error = {
    error: boolean;
    fieldName: string;
    errorName: string;
  };
  export type Result = Error | Error[] | true;
}
