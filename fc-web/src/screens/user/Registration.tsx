import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Formik } from "formik";
import RegistrationValidation from "./registration-validation";
import AccountCredentialsForm from "./AccountCredentialsForm";
import AccountPersonalForm, { retrieveMinimumRequiredAge, countryLocalNameCodeMap } from "./AccountPersonalForm";
import AccountCustomizationForm from "./AccountCustomizationForm";
import { Paper, Typography, Stepper, Step, StepLabel } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { REGISTER, LOGIN } from "../../gql/mutations";
import { loginUser } from "../../utils/user-utils";

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

const initialRegistrationValues: RegistrationFormValues = {
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

const Registration = () => {
  const intl = useIntl();

  const [activeStep, setActiveStep] = useState<number>(0);
  const [registerMutation] = useMutation(REGISTER);
  const [loginMutation] = useMutation(LOGIN, {
    onCompleted: data => loginUser(data.tokenAuth.token),
  });

  const steps: string[] = [
    intl.formatMessage({ id: "user.action.createCredentials.name" }),
    intl.formatMessage({ id: "user.action.enterPersonalDetails.name" }),
    intl.formatMessage({ id: "user.action.customizeAccount.name" }),
  ];

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const submitRegistrationApplication = async (values: RegistrationFormValues) => {
    await registerMutation({
      variables: {
        email: values.email,
        password: values.password,
        dateOfBirth: values.dateOfBirth.toISOString().split("T")[0],
        firstName: values.firstName,
        lastName: values.lastName,
        displayName: values.displayName,
        country: countryLocalNameCodeMap[values.country],
        recaptchaToken: values.recaptchaToken,
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
      initialValues={initialRegistrationValues}
      onSubmit={submitRegistrationApplication}
      validate={values => new RegistrationValidation(intl, values).validateRegistration(activeStep)}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ values, errors, validateForm, submitForm }) => {
        const onNext = (event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
          validateForm().then(errors => {
            Object.keys(errors).length === 0 && handleNext();
          });
        };

        const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
          submitForm();
        };

        return (
          <div className="container--center-focus">
            <Paper className="form-paper" elevation={4}>
              <Typography variant="h4" component="h2">
                {intl.formatMessage({ id: "user.form.title.registration.name" })}
              </Typography>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label: string) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {
                [
                  <AccountCredentialsForm values={values} errors={errors} onNext={onNext} />,
                  <AccountPersonalForm errors={errors} onBack={handleBack} onNext={onNext} />,
                  <AccountCustomizationForm errors={errors} onBack={handleBack} onSubmit={onSubmit} />,
                ][activeStep]
              }
            </Paper>
          </div>
        );
      }}
    </Formik>
  );
};

export default Registration;
