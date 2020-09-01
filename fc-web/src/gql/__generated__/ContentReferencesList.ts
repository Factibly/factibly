/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ContentReferencesList
// ====================================================

export interface ContentReferencesList_content_referenceSet {
  __typename: "CitationType";
  style: string | null;
  reference: string | null;
}

export interface ContentReferencesList_content {
  __typename: "ContentType";
  /**
   * The ID of the object
   */
  id: string;
  referenceSet: (ContentReferencesList_content_referenceSet | null)[] | null;
}

export interface ContentReferencesList {
  content: ContentReferencesList_content | null;
}

export interface ContentReferencesListVariables {
  contentId: string;
}
