import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Formik, Form, Field } from "formik";
import TextInput from "../../common/TextInput";
import FormButtonBox from "../../common/FormButtonBox";
import {
  Paper,
  Typography,
  Link,
  FormGroup,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../gql/mutations";
import { loginUser } from "../../utils/user-utils";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const intl = useIntl();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberUser, setRememberUser] = useState<boolean>(false);

  const [loginMutation] = useMutation(LOGIN, {
    onCompleted: data => loginUser(data.tokenAuth.token),
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleRememberUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberUser(event.target.checked);
  };

  const handleLoginAttempt = (values: LoginFormValues) => {
    loginMutation({ variables: { email: values.email, password: values.password } });
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={handleLoginAttempt}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ errors, submitForm }) => {
        const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          submitForm();
        };

        return (
          <div className="container--center-focus">
            <Paper className="form-paper" elevation={4}>
              <Typography variant="h4" component="h2">
                {intl.formatMessage({ id: "FakeCheck Sign-In" })}
              </Typography>
              <Form onSubmit={onSubmit}>
                <FormGroup className="account-form">
                  <Field
                    as={TextInput}
                    name="email"
                    type="email"
                    label={intl.formatMessage({ id: "user.form.field.emailAddress.name" })}
                    autoComplete="email"
                    errors={errors.email}
                    required
                  />
                  <Field
                    as={TextInput}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    label={intl.formatMessage({ id: "user.form.field.password.name" })}
                    autoComplete="current-password"
                    errors={errors.password}
                    required
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <Link href="#" variant="body2" style={{ color: "inherit", textAlign: "left" }}>
                    <strong>{intl.formatMessage({ id: "user.action.forgotPassword.name" })}</strong>
                  </Link>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberUser}
                        onChange={handleRememberUserChange}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label={intl.formatMessage({ id: "user.action.rememberUser.name" })}
                  />
                </FormGroup>
                <FormButtonBox
                  primaryText={intl.formatMessage({ id: "user.action.login.name" })}
                  secondaryText={intl.formatMessage({ id: "user.action.register.name" })}
                  href="/account/register"
                />
              </Form>
            </Paper>
          </div>
        );
      }}
    </Formik>
  );
};

export default Login;
