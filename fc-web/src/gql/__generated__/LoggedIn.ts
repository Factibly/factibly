/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LoggedIn
// ====================================================

export interface LoggedIn_currentUser {
  __typename: "UserType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface LoggedIn {
  currentUser: LoggedIn_currentUser | null;
}
