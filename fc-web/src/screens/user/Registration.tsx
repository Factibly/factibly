import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { useLocation } from "react-router-dom";
import { useIntl } from "react-intl";
import { Helmet } from "react-helmet";
import { Formik } from "formik";
import AccountCredentialsForm from "./AccountCredentialsForm";
import AccountPersonalForm, { countryNameCodeMap } from "./AccountPersonalForm";
import AccountCustomizationForm from "./AccountCustomizationForm";
import FormPaper from "../../common/FormPaper";
import { Typography, Stepper, Step, StepLabel } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { CreateUser, CreateUserVariables } from "../../gql/__generated__/CreateUser";
import { Login, LoginVariables } from "../../gql/__generated__/Login";
import { LOGIN, CREATE_USER } from "../../gql/mutations";
import { dataUrltoFile } from "../../utils/file-utils";
import {
  RegistrationFormValues,
  initialValues,
  RegistrationFormValidation,
} from "../../utils/forms/registration-form-helper";
import { loginUser } from "../../hooks/state";

var avatar: File | null = null;
const avatarEditorRef = (editor: any, image: File | null) => {
  if (editor && image) {
    avatar = dataUrltoFile(editor.getImageScaledToCanvas().toDataURL(), image.name);
  }
};

const Registration = () => {
  const locale = useSelector((state: RootState) => state.settingsReducer.locale);
  const prefersDarkMode = useSelector((state: RootState) => state.settingsReducer.prefersDarkMode);

  const location = useLocation();
  const intl = useIntl();

  const [registerMutation] = useMutation<CreateUser, CreateUserVariables>(CREATE_USER);
  const [loginMutation] = useMutation<Login, LoginVariables>(LOGIN, {
    onCompleted: () => loginUser(location.state && location.state["from"]),
  });

  const [activeStep, setActiveStep] = useState<number>(0);
  const handleNext = () => setActiveStep(activeStep + 1);
  const handleBack = () => setActiveStep(activeStep - 1);

  const handlePasswordRequirementFailed = (errorMsgId: string, errors: any) => {
    let passwordErrorMsg = intl.formatMessage({ id: errorMsgId });
    passwordErrorMsg = passwordErrorMsg.charAt(0).toLowerCase() + passwordErrorMsg.slice(1);
    const passwordErrors = intl.formatMessage(
      { id: "user.registration.form.msg.password.error.template" },
      { passwordErrorMsg }
    );
    return { ...errors, password: passwordErrors };
  };

  const submitRegistrationApplication = async (values: RegistrationFormValues) => {
    await registerMutation({
      variables: {
        input: {
          email: values.email,
          password: values.password,
          dateOfBirth: values.dateOfBirth.toISOString().split("T")[0],
          firstName: values.firstName,
          lastName: values.lastName,
          displayName: values.displayName,
          country: countryNameCodeMap[values.country],
          recaptchaToken: values.recaptchaToken,
          avatar,
        },
      },
    });

    loginMutation({
      variables: {
        email: values.email,
        password: values.password,
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitRegistrationApplication}
      validate={values =>
        new RegistrationFormValidation(
          values,
          intl.formatMessage({ id: "general.form.msg.requiredField" }),
          intl.formatMessage({ id: "user.registration.form.msg.email.invalidFormat" }),
          intl.formatMessage({ id: "user.registration.form.msg.password.matchFail" }),
          handlePasswordRequirementFailed
        ).validate(activeStep)
      }
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ values, errors, validateForm, submitForm }) => {
        const onNext = (event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
          validateForm().then(errors => Object.keys(errors).length === 0 && handleNext());
        };

        const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
          submitForm();
        };

        return (
          <div className="container--center-focus">
            <Helmet>
              <title> {intl.formatMessage({ id: "user.registration.form.title" })} </title>
            </Helmet>
            <FormPaper elevation={4}>
              <Typography variant="h4"> {intl.formatMessage({ id: "user.registration.form.title" })} </Typography>
              <Stepper activeStep={activeStep} alternativeLabel>
                {Array.apply(null, Array(3)).map((_, i) => (
                  <Step key={`registration-step-${i}`}>
                    <StepLabel>{intl.formatMessage({ id: `user.registration.form.step.${i + 1}` })}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {
                [
                  <AccountCredentialsForm values={values} errors={errors} onNext={onNext} />,
                  <AccountPersonalForm errors={errors} onBack={handleBack} onNext={onNext} />,
                  <AccountCustomizationForm
                    errors={errors}
                    onBack={handleBack}
                    onSubmit={onSubmit}
                    avatarEditorRef={avatarEditorRef}
                    locale={locale}
                    prefersDarkMode={prefersDarkMode}
                  />,
                ][activeStep]
              }
            </FormPaper>
          </div>
        );
      }}
    </Formik>
  );
};

export default Registration;
