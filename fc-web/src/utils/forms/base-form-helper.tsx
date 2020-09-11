import { FormikErrors } from "formik";

export abstract class BaseFormValidation<T> {
  protected errors: FormikErrors<T> = {};

  constructor(protected values: T, protected readonly requiredFieldMsg: string) {}

  get erroneous(): boolean {
    return !!this.errors;
  }

  onlyCheckRequiredFilled(fieldName: string) {
    if (!this.values[fieldName]) {
      this.errors[fieldName] = this.requiredFieldMsg;
    }
  }

  abstract validate(activeStep?: number): FormikErrors<T>;
}
