import React from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { Form, Field, FormikErrors, useFormikContext, useField } from "formik";
import { RegistrationFormValues } from "./Registration";
import Recaptcha2 from "react-google-recaptcha";
import AvatarUploader from "../../common/AvatarUploader";
import FormButtonBox from "../../common/FormButtonBox";
import FakeCheckErrorMessage from "../../common/FakeCheckErrorMessage";
import TextInput from "../../common/TextInput";
import { FormGroup } from "@material-ui/core";

interface UserPersonalFormProps {
  errors: FormikErrors<RegistrationFormValues>;
  onBack: () => void;
  onSubmit: (event: any) => void | undefined;
}

const AccountCustomizationForm = ({ errors, onBack, onSubmit }: UserPersonalFormProps) => {
  const prefersDarkMode = useSelector((state: any) => state.screenReducers.prefersDarkMode);

  const intl = useIntl();

  const { setFieldValue } = useFormikContext();
  const [recaptchaTokenField] = useField({ name: "recaptchaToken" });

  const onReCaptchaChange = (token: string | null) => {
    setFieldValue(recaptchaTokenField.name, token ?? "");
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup className="account-form">
        <AvatarUploader />
        <Field
          as={TextInput}
          name="displayName"
          label={intl.formatMessage({ id: "user.form.field.displayName.name" })}
          errors={errors.displayName}
        />
      </FormGroup>
      <Recaptcha2
        {...recaptchaTokenField}
        sitekey={process.env.REACT_APP_RECAPTCHA_V2_SITE_KEY ?? ""}
        hl={localStorage.getItem("site_locale") ?? intl.locale}
        theme={prefersDarkMode ? "dark" : "light"}
        onChange={onReCaptchaChange}
      />
      {errors.recaptchaToken && <FakeCheckErrorMessage msg={errors.recaptchaToken} />}
      <FormButtonBox
        primaryText={intl.formatMessage({ id: "user.action.createAccount.name" })}
        secondaryText={intl.formatMessage({ id: "general.action.back.name" })}
        onSecondaryClick={onBack}
      />
    </Form>
  );
};

export default AccountCustomizationForm;
