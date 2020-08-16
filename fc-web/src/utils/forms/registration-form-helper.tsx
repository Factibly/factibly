import { BaseFormValidation } from "./base-form-helper";
import {
  validateEmailAddressFormat,
  validatePasswordMinimumLength,
  validatePasswordUppercase,
  validatePasswordNumericality,
} from "../validators";

export function retrieveMinimumRequiredAge() {
  const minAge = 16;
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - minAge);
  return maxDate;
}

export function retrievePasswordRequirements(password: string) {
  return Object.freeze([
    {
      validator: validatePasswordMinimumLength(password),
      failTextId: "user.registration.form.msg.password.requirement.length",
    },
    {
      validator: validatePasswordUppercase(password),
      failTextId: "user.registration.form.msg.password.requirement.oneUpper",
    },
    {
      validator: validatePasswordNumericality(password),
      failTextId: "user.registration.form.msg.password.requirement.oneNumber",
    },
    // { validator: /^(?:(.)(?!\1{3}))*$/.test(password), failTextId: "user.registration.form.msg.password.requirement.consecutive"},
  ]);
}

export interface RegistrationFormValues {
  email: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  displayName: string;
  country: string;
  recaptchaToken: string;
}

export const initialValues: RegistrationFormValues = {
  email: "",
  password: "",
  passwordConfirmation: "",
  firstName: "",
  lastName: "",
  dateOfBirth: retrieveMinimumRequiredAge(),
  displayName: "",
  country: "",
  recaptchaToken: "",
};

export class RegistrationFormValidation extends BaseFormValidation<RegistrationFormValues> {
  readonly #emailFormatErrorMsg: string = "";
  readonly #passwordMatchErrorMsg: string = "";
  readonly #onPasswordRequirementFailed: (x: string, errors: any) => typeof errors = () => {};

  constructor(
    values: RegistrationFormValues,
    requiredFieldMsg: string,
    emailFormatErrorMsg: string,
    passwordMatchErrorMsg: string,
    onPasswordRequirementFailed: (x: string, errors: any) => typeof errors
  ) {
    super(values, requiredFieldMsg);
    this.#emailFormatErrorMsg = emailFormatErrorMsg;
    this.#passwordMatchErrorMsg = passwordMatchErrorMsg;
    this.#onPasswordRequirementFailed = onPasswordRequirementFailed;
  }

  validateEmail() {
    if (!this.values.email) {
      this.errors.email = this.requiredFieldMsg;
    } else if (!validateEmailAddressFormat(this.values.email)) {
      this.errors.email = this.#emailFormatErrorMsg;
    }
  }

  validatePassword() {
    if (!this.values.password) {
      this.errors.password = this.requiredFieldMsg;
    } else {
      retrievePasswordRequirements(this.values.password).forEach(req => {
        if (!req.validator) {
          this.errors = this.#onPasswordRequirementFailed(req.failTextId, this.errors);
        }
      });
    }
  }

  validatePasswordConfirmation() {
    if (!this.values.passwordConfirmation) {
      this.errors.passwordConfirmation = this.requiredFieldMsg;
    } else if (this.values.password !== this.values.passwordConfirmation) {
      this.errors.passwordConfirmation = this.#passwordMatchErrorMsg;
    }
  }

  private _validateCredentials() {
    this.validateEmail();
    this.validatePassword();
    this.validatePasswordConfirmation();
  }

  private _validatePersonal() {
    ["firstName", "lastName", "country", "dateOfBirth"].forEach(v => this.onlyCheckRequiredFilled(v));
  }

  private _validateCustomization() {
    ["displayName", "recaptchaToken"].forEach(v => this.onlyCheckRequiredFilled(v));
  }

  validate = (activeStep: number) => {
    switch (activeStep) {
      case 0:
        this._validateCredentials();
        break;
      case 1:
        this._validatePersonal();
        break;
      case 2:
      default:
        this._validateCustomization();
    }
    return this.errors;
  };
}
