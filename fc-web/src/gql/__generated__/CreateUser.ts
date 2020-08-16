/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateUserInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateUser
// ====================================================

export interface CreateUser_createUser_user {
  __typename: "UserType";
  /**
   * The ID of the object.
   */
  id: string;
  email: string;
}

export interface CreateUser_createUser {
  __typename: "CreateUserPayload";
  user: CreateUser_createUser_user | null;
}

export interface CreateUser {
  createUser: CreateUser_createUser | null;
}

export interface CreateUserVariables {
  input: CreateUserInput;
}
