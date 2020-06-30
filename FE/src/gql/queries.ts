import gql from "graphql-tag";

export const USER_LOGGED_IN = gql`
  {
    userLoggedIn @client
  }
`;
