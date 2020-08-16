import { ApolloClient } from "@apollo/client";
import cache from "../hooks/cache";

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_GRAPHQL_CLIENT_URL}/graphql`,
  cache: cache,
  headers: {
    authorization: `JWT ${localStorage.getItem("auth_token")}` ?? "",
  },
});

export default client;
