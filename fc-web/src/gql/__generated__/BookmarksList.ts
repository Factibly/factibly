/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BookmarksList
// ====================================================

export interface BookmarksList_currentUser_bookmarks {
  __typename: "ContentType";
  /**
   * The ID of the object
   */
  id: string;
  url: string;
  imageUrl: string | null;
  title: string | null;
  overallScore: number | null;
}

export interface BookmarksList_currentUser {
  __typename: "UserType";
  /**
   * The ID of the object
   */
  id: string;
  bookmarks: (BookmarksList_currentUser_bookmarks | null)[] | null;
}

export interface BookmarksList {
  currentUser: BookmarksList_currentUser | null;
}
