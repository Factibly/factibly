/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CurrentUser
// ====================================================

export interface CurrentUser_currentUser {
  __typename: "UserType";
  /**
   * The ID of the object
   */
  id: string;
  displayName: string;
  email: string;
  country: string;
  avatar: string | null;
}

export interface CurrentUser {
  currentUser: CurrentUser_currentUser | null;
}
