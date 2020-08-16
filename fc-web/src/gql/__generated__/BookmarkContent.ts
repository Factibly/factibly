/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BookmarkContentInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: BookmarkContent
// ====================================================

export interface BookmarkContent_bookmarkContent {
  __typename: "BookmarkContentPayload";
  bookmarked: boolean | null;
  errors: string | null;
}

export interface BookmarkContent {
  bookmarkContent: BookmarkContent_bookmarkContent | null;
}

export interface BookmarkContentVariables {
  input: BookmarkContentInput;
}
