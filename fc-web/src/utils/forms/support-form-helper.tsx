import { BaseFormValidation } from "./base-form-helper";
import { validateEmailAddressFormat } from "../validators";

export interface SupportFormValues {
  email: string;
  title: string;
  description: string;
  occurrenceDate: Date;
}

export const initialValues: SupportFormValues = {
  email: "",
  title: "",
  description: "",
  occurrenceDate: new Date(),
};

export class SupportFormValidation extends BaseFormValidation<SupportFormValues> {
  readonly #emailFormatErrorMsg: string = "";

  constructor(values: SupportFormValues, requiredFieldMsg: string, emailFormatErrorMsg: string) {
    super(values, requiredFieldMsg);
    this.#emailFormatErrorMsg = emailFormatErrorMsg;
  }

  validate = () => {
    if (!this.values.title) this.errors.title = this.requiredFieldMsg;

    if (!this.values.email) {
      this.errors.email = this.requiredFieldMsg;
    } else if (!validateEmailAddressFormat(this.values.email)) {
      this.errors.email = this.#emailFormatErrorMsg;
    }

    return this.errors;
  };
}
