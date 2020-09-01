import React from "react";
import { useIntl } from "react-intl";
import { Form, Field, FormikErrors, useFormikContext, useField } from "formik";
import Recaptcha2 from "react-google-recaptcha";
import AvatarUploader from "../../common/AvatarUploader";
import FormGroupCompact from "../../common/FormGroupCompact";
import FormButtons from "../../common/FormButtons";
import FcInput from "../../common/FcInput";
import FcErrorMessage from "../../common/FcErrorMessage";
import { RegistrationFormValues } from "../../utils/forms/registration-form-helper";

interface UserPersonalFormProps {
  errors: FormikErrors<RegistrationFormValues>;
  onBack: () => void;
  onSubmit: (event: any) => void | undefined;
  avatarEditorRef: (editor: any, image: File | null) => void;
  locale: string;
  prefersDarkMode: boolean;
}

const AccountCustomizationForm = ({
  errors,
  onBack,
  onSubmit,
  avatarEditorRef,
  locale,
  prefersDarkMode = false,
}: UserPersonalFormProps) => {
  const intl = useIntl();

  const { setFieldValue } = useFormikContext();
  const [recaptchaTokenField] = useField({ name: "recaptchaToken" });

  const handleReCaptchaChange = (token: string | null) => setFieldValue(recaptchaTokenField.name, token ?? "", true);

  return (
    <Form onSubmit={onSubmit}>
      <FormGroupCompact>
        <AvatarUploader avatarEditorRef={avatarEditorRef} />
        <Field
          as={FcInput}
          name="displayName"
          label={intl.formatMessage({ id: "user.registration.form.field.displayName" })}
          errorMsg={errors.displayName}
          aria-required="true"
        />
      </FormGroupCompact>
      <Recaptcha2
        {...recaptchaTokenField}
        sitekey={process.env.REACT_APP_RECAPTCHA_V2_SITE_KEY ?? ""}
        hl={locale || intl.locale}
        theme={prefersDarkMode ? "dark" : "light"}
        onChange={handleReCaptchaChange}
        aria-required="true"
      />
      {errors.recaptchaToken && <FcErrorMessage id="recaptcha" msg={errors.recaptchaToken} />}
      <FormButtons
        primaryText={intl.formatMessage({ id: "user.action.createAccount" })}
        secondaryText={intl.formatMessage({ id: "general.action.back" })}
        onSecondaryClick={onBack}
      />
    </Form>
  );
};

export default AccountCustomizationForm;
