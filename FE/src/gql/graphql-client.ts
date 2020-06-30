import ApolloClient from "apollo-boost";
import { isLoggedIn } from "../utils/utils";

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_GRAPHQL_CLIENT_URL}/graphql`,
  clientState: {
    defaults: {
      userLoggedIn: isLoggedIn()
    }
  }
});

export default client;
