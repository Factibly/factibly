import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useIntl } from "react-intl";
import { Helmet } from "react-helmet";
import { Formik, Form, Field } from "formik";
import FormPaper from "../../common/FormPaper";
import FormGroupCompact from "../../common/FormGroupCompact";
import FcInput from "../../common/FcInput";
import FormButtons from "../../common/FormButtons";
import PageContainer from "../../common/PageContainer";
import { Typography, Link, IconButton, InputAdornment } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useMutation } from "@apollo/client";
import { Login, LoginVariables } from "../../gql/__generated__/Login";
import { LOGIN } from "../../gql/mutations";
import { useAlert } from "../../hooks/useAlert";
import { loginUser } from "../../hooks/state";
import { ACCOUNT_REGISTER_PATH } from "../../static/paths";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const location = useLocation();
  const intl = useIntl();

  const [, setAlert] = useAlert();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

  const [loginMutation] = useMutation<Login, LoginVariables>(LOGIN);
  const handleLoginAttempt = async (values: LoginFormValues) => {
    try {
      await loginMutation({ variables: { email: values.email, password: values.password } });

      loginUser(location.state && location.state["from"]);

      setAlert({
        severity: "success",
        message: intl.formatMessage({ id: "user.alert.msg.loginSuccess" }),
      });
    } catch (err) {
      setAlert({
        severity: "error",
        message: intl.formatMessage({ id: err.toString() }),
      });
    }
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
          <PageContainer maxWidth="md">
            <Helmet>
              <title> {intl.formatMessage({ id: "user.signin.form" })} </title>
            </Helmet>
            <FormPaper elevation={4}>
              <Typography component="h2" variant="h4">
                {intl.formatMessage({ id: "user.signin.form" })}
              </Typography>
              <Form onSubmit={onSubmit}>
                <FormGroupCompact>
                  <Field
                    as={FcInput}
                    name="email"
                    type="email"
                    label={intl.formatMessage({ id: "user.signin.form.field.email" })}
                    autoComplete="email"
                    errorMsg={errors.email}
                    aria-required="true"
                  />
                  <Field
                    as={FcInput}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    label={intl.formatMessage({ id: "user.signin.form.field.password" })}
                    autoComplete="current-password"
                    errorMsg={errors.password}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          aria-label={intl.formatMessage({
                            id: "user.signin.form.action.password.toggleVisibility.aria",
                          })}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    aria-required="true"
                  />
                  <Link href="#" variant="body2" style={{ color: "inherit", textAlign: "left" }}>
                    <b> {intl.formatMessage({ id: "user.action.forgotPassword" })} </b>
                  </Link>
                </FormGroupCompact>
                <FormButtons
                  primaryText={intl.formatMessage({ id: "user.action.login" })}
                  secondaryText={intl.formatMessage({ id: "user.action.register" })}
                  to={{ pathname: ACCOUNT_REGISTER_PATH, state: location.state }}
                />
              </Form>
            </FormPaper>
          </PageContainer>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
