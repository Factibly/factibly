import rollbar from "../config/rollbar";
import { setLoginState } from "../hooks/state";
import history from "../hooks/history";

export const isValidEmailAddress = (email: string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export const loginUser = token => {
  localStorage.setItem("auth_token", token);
  setLoginState(true);

  history.push("/");
};

export const logoutUser = () => {
  rollbar.configure({
    payload: {
      person: {
        id: null,
      },
    },
  });
  localStorage.removeItem("auth_token");
  setLoginState(false);

  history.push("/");
};

export const isLoggedIn = (): boolean => {
  return "auth_token" in localStorage;
};
