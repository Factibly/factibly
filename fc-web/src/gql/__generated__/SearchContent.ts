/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchContentInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: SearchContent
// ====================================================

export interface SearchContent_searchContent_content {
  __typename: "ContentType";
  /**
   * The ID of the object.
   */
  id: string;
  url: string;
}

export interface SearchContent_searchContent {
  __typename: "SearchContentPayload";
  content: SearchContent_searchContent_content | null;
  errors: string | null;
}

export interface SearchContent {
  searchContent: SearchContent_searchContent | null;
}

export interface SearchContentVariables {
  input: SearchContentInput;
}
