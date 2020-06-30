import React, { useState } from "react";
import { useIntl, FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, FormikErrors } from "formik";
import zxcvbn from "zxcvbn";
import * as countryList from "country-list";
import TextInput from "../../common/TextInput";
import ErrorMessage from "../../common/ErrorMessage";
import {
  Box,
  InputLabel,
  FormGroup,
  FormControl,
  Paper,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Select
} from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { USER_LOGGED_IN } from "../../gql/queries";
import { REGISTER, LOGIN } from "../../gql/mutations";
import "../../styles/desktop.css";
import "../../styles/mobile.css";
import "../../styles/universal.css";

interface RegistrationFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  displayName: string;
  country: string;
}

interface PsmProps {
  password: string;
}

const passwordScoreToTextual = (score: number) => {
  let passwordStrengthId;
  switch (score) {
    case 0:
      passwordStrengthId = "passwordZero";
      break;
    case 1:
      passwordStrengthId = "passwordOne";
      break;
    case 2:
      passwordStrengthId = "passwordTwo";
      break;
    case 3:
      passwordStrengthId = "passwordThree";
      break;
    case 4:
      passwordStrengthId = "passwordFour";
      break;
    default:
      passwordStrengthId = "passwordZero";
  }
  return <FormattedMessage id={passwordStrengthId} />;
};

const PasswordStrengthMeter = (props: PsmProps) => {
  const score = zxcvbn(props?.password)?.score;
  return (
    <>
      <meter value={score} min={0} max={4} low={2} high={3} optimum={4} style={{ width: "100%" }}>
        {passwordScoreToTextual(score)}
      </meter>
      <p style={{ fontSize: "small", textAlign: "left" }}> {passwordScoreToTextual(score)} </p>
    </>
  );
};

const Registration = () => {
  const intl = useIntl();
  const history = useHistory();

  const [activeStep, setActiveStep] = useState(0);
  const { client } = useQuery(USER_LOGGED_IN);

  const [registerMutation] = useMutation(REGISTER);
  const [loginMutation] = useMutation(LOGIN, {
    onCompleted: data => {
      localStorage.setItem("auth_token", data.tokenAuth.token);
      client.writeData({ data: { userLoggedIn: true } });

      history.push("/");
    }
  });

  const steps: string[] = [
    intl.formatMessage({ id: "createCredentials" }),
    intl.formatMessage({ id: "enterPersonalDetails" }),
    intl.formatMessage({ id: "customizeAccount" })
  ];

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const UserCredentialsForm = ({ values, errors, onNext }) => {
    return (
      <Form onSubmit={onNext}>
        <FormGroup className="account-form">
          <Field
            as={TextInput}
            autoFocus
            name="email"
            label={intl.formatMessage({ id: "emailAddress" })}
            errors={errors.email}
          />
          <div>
            <Field
              as={TextInput}
              name="password"
              label={intl.formatMessage({ id: "password" })}
              type="password"
              errors={errors.password}
            />
            {!errors.password && <PasswordStrengthMeter password={values.password} />}
          </div>
          <Field
            as={TextInput}
            name="passwordConfirm"
            label={intl.formatMessage({ id: "passwordConfirmation" })}
            errors={errors.passwordConfirm}
            type="password"
          />
        </FormGroup>
        <Box className="form-box">
          <Button fullWidth type="submit" variant="contained" color="primary">
            <FormattedMessage id="next" />
          </Button>
        </Box>
      </Form>
    );
  };

  const UserPersonalForm = ({ errors, onNext }) => {
    return (
      <Form onSubmit={onNext}>
        <FormGroup className="account-form">
          <Field
            as={TextInput}
            name="firstName"
            label={intl.formatMessage({ id: "firstName" })}
            errors={errors.firstName}
          />
          <Field
            as={TextInput}
            name="lastName"
            label={intl.formatMessage({ id: "lastName" })}
            errors={errors.lastName}
          />
          <Field
            as={TextField}
            name="dateOfBirth"
            type="date"
            variant="outlined"
            InputProps={{ inputProps: { max: new Date() } }}
            InputLabelProps={{
              shrink: true
            }}
            autoComplete="bday"
            label={intl.formatMessage({ id: "dateOfBirth" })}
            errors={errors.dateOfBirth}
          />
        </FormGroup>
        <Box className="form-box">
          <Button fullWidth type="submit" variant="contained" color="primary">
            <FormattedMessage id="next" />
          </Button>
          <Button fullWidth variant="contained" color="default" onClick={handleBack}>
            <FormattedMessage id="back" />
          </Button>
        </Box>
      </Form>
    );
  };

  const UserAccountCustomizationForm = ({ errors, onSubmit }) => {
    return (
      <Form onSubmit={onSubmit}>
        <FormGroup className="account-form">
          <Field
            as={TextInput}
            name="displayName"
            label={intl.formatMessage({ id: "displayName" })}
            errors={errors.country}
          />
          <FormControl variant="outlined">
            <InputLabel htmlFor="country">
              <FormattedMessage id="countryRegion" />
            </InputLabel>
            <Field
              as={Select}
              variant="outlined"
              name="country"
              autoComplete="country-name"
              native
              label={intl.formatMessage({ id: "countryRegion" })}
            >
              <option value="" disabled />
              {countryList.getNames().map((name: string) => (
                <option value={name} key={name}>
                  {name}
                </option>
              ))}
            </Field>
            {errors.country && <ErrorMessage msg={errors.country} />}
          </FormControl>
        </FormGroup>
        <Box className="form-box">
          <Button fullWidth type="submit" variant="contained" color="primary">
            <FormattedMessage id="createAccount" />
          </Button>
          <Button fullWidth variant="contained" color="default" onClick={handleBack}>
            <FormattedMessage id="back" />
          </Button>
        </Box>
      </Form>
    );
  };

  const validate = (values: RegistrationFormValues) => {
    let errors: FormikErrors<RegistrationFormValues> = {};
    const requiredFieldMsg = intl.formatMessage({ id: "requiredField" });

    if (activeStep === 0) {
      if (!values.email) {
        errors.email = requiredFieldMsg;
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = intl.formatMessage({ id: "invalidEmailAddress" });
      }

      if (!values.password) {
        errors.password = requiredFieldMsg;
      } else if (values.password.length < 6) {
        errors.password = intl.formatMessage({ id: "passwordTooShort" });
      }

      if (!values.passwordConfirm) {
        errors.passwordConfirm = requiredFieldMsg;
      } else if (values.password !== values.passwordConfirm) {
        errors.passwordConfirm = "Password must match";
      }
    } else if (activeStep === 1) {
      if (!values.firstName) errors.firstName = requiredFieldMsg;
      if (!values.lastName) errors.lastName = requiredFieldMsg;
      if (!values.dateOfBirth) errors.dateOfBirth = requiredFieldMsg;
    } else {
      if (!values.displayName) errors.displayName = requiredFieldMsg;
      if (!values.country) errors.country = requiredFieldMsg;
    }

    return errors;
  };

  const submit = async (values: RegistrationFormValues) => {
    await registerMutation({
      variables: {
        email: values.email,
        password: values.password,
        dateOfBirth: values.dateOfBirth,
        firstName: values.firstName,
        lastName: values.lastName,
        displayName: values.displayName
      }
    });

    loginMutation({
      variables: {
        email: values.email,
        password: values.password
      }
    });
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        passwordConfirm: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        displayName: "",
        country: ""
      }}
      onSubmit={submit}
      validate={validate}
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
                <FormattedMessage id="registrationTitle" />
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
                  <UserCredentialsForm values={values} errors={errors} onNext={onNext} />,
                  <UserPersonalForm errors={errors} onNext={onNext} />,
                  <UserAccountCustomizationForm errors={errors} onSubmit={onSubmit} />
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
