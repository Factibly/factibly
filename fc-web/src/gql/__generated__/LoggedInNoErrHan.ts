/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LoggedInNoErrHan
// ====================================================

export interface LoggedInNoErrHan_currentUser {
  __typename: "UserType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface LoggedInNoErrHan {
  currentUser: LoggedInNoErrHan_currentUser | null;
}
