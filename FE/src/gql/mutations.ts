import gql from "graphql-tag";

export const LOGIN = gql`
  mutation TokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
    }
  }
`;

export const REGISTER = gql`
  mutation CreateUser(
    $email: String!
    $password: String!
    $dateOfBirth: String!
    $firstName: String!
    $lastName: String!
    $displayName: String!
  ) {
    createUser(
      email: $email
      password: $password
      dateOfBirth: $dateOfBirth
      firstName: $firstName
      lastName: $lastName
      displayName: $displayName
    ) {
      user {
        id
        email
      }
    }
  }
`;
