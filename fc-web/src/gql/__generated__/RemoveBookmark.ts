/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RemoveBookmarkInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: RemoveBookmark
// ====================================================

export interface RemoveBookmark_removeBookmark {
  __typename: "RemoveBookmarkPayload";
  removed: boolean | null;
  errors: string | null;
}

export interface RemoveBookmark {
  removeBookmark: RemoveBookmark_removeBookmark | null;
}

export interface RemoveBookmarkVariables {
  input: RemoveBookmarkInput;
}
