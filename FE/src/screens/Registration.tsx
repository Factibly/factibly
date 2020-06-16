import React, { useState } from "react";
import * as yup from "yup";
import zxcvbn from "zxcvbn";
import { Formik } from "formik";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import ErrorMessage from "../common/ErrorMessage";
import * as countryList from "country-list";
import "../styles/desktop.css";
import "../styles/universal.css";

import { useMutation } from "@apollo/react-hooks";
import { REGISTER } from "../gql/mutations";
import TextInput from "../common/TextInput";

function passwordScoreToTextual(score: number) {
  switch (score) {
    case 0:
      return "Extremely Weak";
    case 1:
      return "Very Weak";
    case 2:
      return "Weak";
    case 3:
      return "Adequate";
    case 4:
    default:
      return "Strong";
  }
}

function showPasswordStrength(password: string) {
  const score = zxcvbn(password).score;
  return (
    <div>
      <meter value={score} min={0} max={4} low={2} high={3} optimum={4} style={{ width: "100%" }}>
        {passwordScoreToTextual(score)}
      </meter>
      <p style={{ fontSize: "small", textAlign: "left" }}> {passwordScoreToTextual(score)} </p>
    </div>
  );
}

const Registration = ({ classes }) => {
  const steps: string[] = ["Create Credentials", "Enter Personal Details", "Customize Account"];
  const [activeStep, setActiveStep] = useState(0);

  const [registerMutation, registerData] = useMutation(REGISTER, {
    onCompleted: data => {
      // history push somewhere
      alert(data.createUser.user.email);
    }
  });

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const missingFieldMsg = "Required field";
  let userFields = {};

  const createCredentials = (
    <Formik
      initialValues={{ email: "", password: "", passwordConfirm: "" }}
      onSubmit={values => {
        console.log(values);
        userFields = { ...userFields, values };
        handleNext();
        return;
      }}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={yup.object().shape({
        email: yup
          .string()
          .email("Invalid email address")
          .required(missingFieldMsg),
        password: yup
          .string()
          .required(missingFieldMsg)
          .max(255),
        passwordConfirm: yup
          .string()
          .required(missingFieldMsg)
          .oneOf([yup.ref("password")], "Passwords do not match")
      })}
      render={props => {
        const { values, errors, touched, handleSubmit, handleChange } = props;
        return (
          <form onSubmit={handleSubmit}>
            <FormGroup className="account-form">
              <TextInput
                name="email"
                label="Email"
                value={values.email}
                handleChange={handleChange}
                error={errors.email}
              />
              <TextInput
                name="password"
                label="Password"
                type="password"
                value={values.password}
                handleChange={handleChange}
                error={errors.password}
              >
                {!errors.password && showPasswordStrength(values.password)}
              </TextInput>
              <TextInput
                name="passwordConfirm"
                label="Confirm Password"
                type="password"
                value={values.passwordConfirm}
                handleChange={handleChange}
                error={errors.passwordConfirm}
              />
            </FormGroup>
            <Box>
              <Button fullWidth type="submit" variant="contained" color="primary" style={{ margin: "5px 0 5px 0" }}>
                Next
              </Button>
            </Box>
          </form>
        );
      }}
    />
  );

  const createUserDetails = (
    <Formik
      initialValues={{ userFirstName: "", userFamilyName: "", userDoB: "" }}
      onSubmit={values => {
        userFields = { ...userFields, values };
        handleNext();
        return;
      }}
      validationSchema={yup.object().shape({
        userFirstName: yup.string().required(missingFieldMsg),
        userFamilyName: yup.string().required(missingFieldMsg),
        userDoB: yup.date().max(new Date(), "Invalid date of birth")
      })}
      render={props => {
        const { values, errors, touched, handleSubmit, handleChange } = props;
        return (
          <form onSubmit={handleSubmit}>
            <FormGroup className="account-form">
              <FormControl variant="outlined">
                <InputLabel htmlFor="user-first-name"> First Name </InputLabel>
                <OutlinedInput
                  id="user-first-name"
                  fullWidth
                  autoFocus
                  name="userFirstName"
                  label="firstName"
                  autoComplete="given-name"
                  onChange={handleChange}
                  value={values.userFirstName || ""}
                />
                {errors.userFirstName && touched.userFirstName && <ErrorMessage msg={errors.userFirstName} />}
              </FormControl>
              <FormControl variant="outlined">
                <InputLabel htmlFor="user-family-name"> Last Name </InputLabel>
                <OutlinedInput
                  id="user-family-name"
                  fullWidth
                  name="userFamilyName"
                  label="familyName"
                  autoComplete="family-name"
                  onChange={handleChange}
                  value={values.userFamilyName || ""}
                />
                {errors.userFamilyName && touched.userFamilyName && <ErrorMessage msg={errors.userFamilyName} />}
              </FormControl>
              <FormControl variant="outlined">
                <TextField
                  id="date"
                  label="Date of Birth"
                  type="date"
                  name="userDoB"
                  variant="outlined"
                  InputProps={{ inputProps: { max: new Date() } }}
                  InputLabelProps={{
                    shrink: true
                  }}
                  autoComplete="bday"
                  onChange={handleChange}
                  value={values.userDoB || ""}
                />
                {errors.userDoB && touched.userDoB && <ErrorMessage msg={errors.userDoB} />}
              </FormControl>
            </FormGroup>
            <Box>
              <Button fullWidth type="submit" variant="contained" color="primary" style={{ margin: "5px 0 5px 0" }}>
                Next
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="default"
                onClick={handleBack}
                style={{ margin: "5px 0 5px 0" }}
              >
                Back
              </Button>
            </Box>
          </form>
        );
      }}
    />
  );

  const createAccountSettings = (
    <Formik
      initialValues={{ userDisplayName: "", userCountry: "" }}
      onSubmit={values => {
        userFields = { ...userFields, values };
        return;
      }}
      validationSchema={yup.object().shape({
        userDisplayName: yup.string().required(missingFieldMsg),
        userCountry: yup.string().required(missingFieldMsg)
      })}
      render={props => {
        const { values, errors, touched, handleSubmit, handleChange } = props;
        return (
          <form onSubmit={handleSubmit}>
            <FormGroup className="account-form">
              <FormControl variant="outlined">
                <InputLabel htmlFor="user-display-name"> Display Name </InputLabel>
                <OutlinedInput
                  id="user-display-name"
                  fullWidth
                  autoFocus
                  name="userDisplayName"
                  label="Display Name"
                  onChange={handleChange}
                  value={values.userDisplayName || ""}
                />
                {errors.userDisplayName && touched.userDisplayName && <ErrorMessage msg={errors.userDisplayName} />}
              </FormControl>
              <FormControl variant="outlined">
                <InputLabel htmlFor="user-country"> Country </InputLabel>
                <Select
                  native
                  id="user-country"
                  label="Country"
                  name="userCountry"
                  variant="outlined"
                  autoComplete="country-name"
                  onChange={handleChange}
                  value={values.userCountry || ""}
                >
                  {countryList.getNames().map((name: string) => (
                    <option key={name}> {name} </option>
                  ))}
                </Select>
                {errors.userCountry && touched.userCountry && <ErrorMessage msg={errors.userCountry} />}
              </FormControl>
            </FormGroup>
            <Box>
              <Button fullWidth type="submit" variant="contained" color="primary" style={{ margin: "5px 0 5px 0" }}>
                Create Account
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="default"
                onClick={handleBack}
                style={{ margin: "5px 0 5px 0" }}
              >
                Back
              </Button>
            </Box>
          </form>
        );
      }}
    />
  );

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return createCredentials;
      case 1:
        return createUserDetails;
      case 2:
      default:
        return createAccountSettings;
    }
  };

  return (
    <div>
      <Grid container className="container-grid" justify="center" alignItems="center">
        <Paper className="form-paper form-paper-desktop" elevation={4}>
          <Typography variant="h4" component="h2">
            Create Your Account
          </Typography>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label: string) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {getStepContent(activeStep)}
        </Paper>
      </Grid>
    </div>
  );
};

export default Registration;
