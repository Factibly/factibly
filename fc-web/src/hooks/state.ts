import client from "../gql/client";
import { CURRENT_USER, LOGGED_IN } from "../gql/queries";
import { CurrentUser } from "../gql/__generated__/CurrentUser";
import rollbar from "../libs/rollbar";
import history from "./history";
import { LOGOUT } from "../gql/mutations";

export const loginUser = async (redirectPreset: string | false | null = null) => {
  await client.resetStore();
  client
    .query<CurrentUser>({ query: CURRENT_USER })
    .then(res => rollbar.configure({ payload: { person: { id: res.data?.currentUser?.id } } }));

  if (redirectPreset) {
    history.replace(redirectPreset);
  } else {
    history.push("/");
  }
};

export const logoutUser = async (redirectHome: boolean = true) => {
  rollbar.configure({
    payload: {
      person: {
        id: null,
      },
    },
  });
  await client.mutate({ mutation: LOGOUT });
  await client.query({ query: LOGGED_IN, fetchPolicy: "network-only" });

  if (redirectHome) {
    history.push("/");
  }
};
