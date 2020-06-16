import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import "../styles/desktop.css";
import "../styles/universal.css";

import { useMutation } from "@apollo/react-hooks";
import { LOGIN } from "../gql/mutations";

const Login = ({ classes }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginMutation, loginData] = useMutation(LOGIN, {
    variables: { email, password },
    onCompleted: data => {
      alert(data.tokenAuth.token);
      // TODO - Store token in Local Storage and attach to every graphql call
    }
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    setEmail(target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    setPassword(target.value);
  };

  return (
    <Grid container className="container-grid" justify="center" alignItems="center">
      <Paper className="form-paper form-paper-desktop" elevation={4}>
        <Typography variant="h4" component="h2">
          Fake News
        </Typography>
        <FormGroup className="account-form">
          <FormControl variant="outlined">
            <InputLabel htmlFor="user-email-address"> Email </InputLabel>
            <OutlinedInput
              id="user-email-address"
              fullWidth
              required
              autoFocus
              type="email"
              name="userEmail"
              label="Email"
              autoComplete="email"
              value={email}
              onChange={handleEmailChange}
            />
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel htmlFor="user-password"> Password </InputLabel>
            <OutlinedInput
              id="user-password"
              fullWidth
              required
              type={showPassword ? "text" : "password"}
              name="userPassword"
              label="Password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
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
              <strong> Forgot password? </strong>
            </Link>
          </FormControl>
        </FormGroup>
        <Box>
          {/* TODO: use CSS to style children */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => loginMutation()}
            style={{ margin: "5px 0 5px 0" }}
          >
            Sign In
          </Button>
          <Button fullWidth variant="contained" href="/account/register" style={{ margin: "5px 0 5px 0" }}>
            Register
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Login;
