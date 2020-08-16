/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * An enumeration.
 */
export enum ContentImageModerationScore {
  A_0 = "A_0",
  A_1 = "A_1",
  A_2 = "A_2",
}

export interface BookmarkContentInput {
  contentId: string;
  clientMutationId?: string | null;
}

export interface CreateUserInput {
  email: string;
  password: string;
  dateOfBirth: any;
  firstName: string;
  lastName: string;
  displayName: string;
  country: string;
  recaptchaToken: string;
  avatar?: any | null;
  clientMutationId?: string | null;
}

export interface DownvoteRatingInput {
  ratingId: string;
  clientMutationId?: string | null;
}

export interface RateContentInput {
  contentId: string;
  score1: number;
  score2: number;
  score3: number;
  recaptchaToken: string;
  justification?: string | null;
  clientMutationId?: string | null;
}

export interface RemoveBookmarkInput {
  contentId: string;
  clientMutationId?: string | null;
}

export interface SearchContentInput {
  url: string;
  clientMutationId?: string | null;
}

export interface UpvoteRatingInput {
  ratingId: string;
  clientMutationId?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
