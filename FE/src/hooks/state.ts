import client from "../gql/client";
import { USER_LOGGED_IN } from "../gql/queries";

export const setLoginState = (loggedIn: boolean) => {
  client.writeQuery({
    query: USER_LOGGED_IN,
    data: {
      userLoggedIn: loggedIn,
    },
  });
};
