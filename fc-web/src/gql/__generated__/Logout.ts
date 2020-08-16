/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Logout
// ====================================================

export interface Logout_deleteRefreshTokenCookie {
  __typename: "DeleteRefreshTokenCookie";
  deleted: boolean;
}

export interface Logout_deleteTokenCookie {
  __typename: "DeleteJSONWebTokenCookie";
  deleted: boolean;
}

export interface Logout {
  deleteRefreshTokenCookie: Logout_deleteRefreshTokenCookie | null;
  deleteTokenCookie: Logout_deleteTokenCookie | null;
}
