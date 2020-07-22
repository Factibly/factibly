import { InMemoryCache } from "@apollo/client";
import { USER_LOGGED_IN } from "../gql/queries";

const cache = new InMemoryCache({});

cache.writeQuery({
  query: USER_LOGGED_IN,
  data: {
    userLoggedIn: "auth_token" in localStorage,
  },
});

export default cache;
