import React, { useState } from "react";
import { useIntl, FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import TextInput from "../../common/TextInput";
import {
  Box,
  Paper,
  Typography,
  Link,
  FormGroup,
  Button,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { LOGIN } from "../../gql/mutations";
import { USER_LOGGED_IN } from "../../gql/queries";
import "../../styles/desktop.css";
import "../../styles/universal.css";

const Login = () => {
  const intl = useIntl();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberUser, setRememberUser] = useState(false);

  const { client } = useQuery(USER_LOGGED_IN);

  const [loginMutation] = useMutation(LOGIN, {
    variables: { email, password },
    onCompleted: data => {
      localStorage.setItem("auth_token", data.tokenAuth.token);
      client.writeData({ data: { userLoggedIn: true } });

      history.push("/");
    }
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRememberUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberUser(event.target.checked);
  };

  return (
    <div className="container--center-focus">
      <Paper className="form-paper" elevation={4}>
        <Typography variant="h4" component="h2">
          FakeCheck
        </Typography>
        <FormGroup className="account-form">
          <TextInput
            name="email"
            type="email"
            label={intl.formatMessage({ id: "emailAddress" })}
            autoComplete="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <TextInput
            name="password"
            type={showPassword ? "text" : "password"}
            label={intl.formatMessage({ id: "password" })}
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
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
          <Link href="#" variant="body2" style={{ textAlign: "left" }}>
            <strong>
              <FormattedMessage id="forgotPassword" />
            </strong>
          </Link>
          <FormControlLabel
            control={
              <Checkbox checked={rememberUser} onChange={handleRememberUserChange} name="checkedB" color="primary" />
            }
            label={intl.formatMessage({ id: "rememberUser" })}
          />
        </FormGroup>
        <Box className="form-box">
          <Button fullWidth variant="contained" color="primary" onClick={() => loginMutation()}>
            <FormattedMessage id="login" />
          </Button>
          <Button fullWidth variant="contained" href="/account/register">
            <FormattedMessage id="register" />
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default Login;
