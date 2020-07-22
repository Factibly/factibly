import { IntlShape } from "react-intl";
import { FormikErrors } from "formik";
import { retrievePasswordRequirements } from "./PasswordStrengthIndicator";
import { RegistrationFormValues } from "./Registration";
import { isValidEmailAddress } from "../../utils/user-utils";

class RegistrationValidation {
  intl: IntlShape;
  values: RegistrationFormValues;
  errors: FormikErrors<RegistrationFormValues> = {};
  requiredFieldMsg: string = "";

  constructor(intl: IntlShape, values: RegistrationFormValues) {
    this.intl = intl;
    this.values = values;
    this.requiredFieldMsg = intl.formatMessage({ id: "general.form.msg.requiredField.content" });
  }

  get erroneous(): boolean {
    return !!this.errors;
  }

  validateEmail() {
    if (!this.values.email) {
      this.errors.email = this.requiredFieldMsg;
    } else if (!isValidEmailAddress(this.values.email)) {
      this.errors.email = this.intl.formatMessage({ id: "user.form.msg.invalidEmailAddress.content" });
    }
  }

  validatePassword() {
    if (!this.values.password) {
      this.errors.password = this.requiredFieldMsg;
    } else {
      retrievePasswordRequirements(this.values.password).forEach(req => {
        if (!req[0]) {
          let passwordErrorMsg = this.intl.formatMessage({ id: req[1].toString() });
          passwordErrorMsg = passwordErrorMsg.charAt(0).toLowerCase() + passwordErrorMsg.slice(1);
          this.errors.password = this.intl.formatMessage(
            { id: "user.form.msg.passwordError.template" },
            { passwordErrorMsg }
          );
          return;
        }
      });
    }
  }

  validatePasswordConfirmation() {
    if (!this.values.passwordConfirmation) {
      this.errors.passwordConfirmation = this.requiredFieldMsg;
    } else if (this.values.password !== this.values.passwordConfirmation) {
      this.errors.passwordConfirmation = this.intl.formatMessage({ id: "user.form.msg.passwordMatchFail.content" });
    }
  }

  _validateCredentials() {
    this.validateEmail();
    this.validatePassword();
    this.validatePasswordConfirmation();
  }

  _validatePersonal() {
    if (!this.values.firstName) this.errors.firstName = this.requiredFieldMsg;
    if (!this.values.lastName) this.errors.lastName = this.requiredFieldMsg;
    if (!this.values.dateOfBirth) this.errors.dateOfBirth = this.requiredFieldMsg;
  }

  _validateCustomization() {
    if (!this.values.displayName) this.errors.displayName = this.requiredFieldMsg;
    if (!this.values.country) this.errors.country = this.requiredFieldMsg;
    if (!this.values.recaptchaToken) this.errors.recaptchaToken = this.requiredFieldMsg;
  }

  validateRegistration = (activeStep: number) => {
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

export default RegistrationValidation;
