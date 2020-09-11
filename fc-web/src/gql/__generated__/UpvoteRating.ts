/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpvoteRatingInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpvoteRating
// ====================================================

export interface UpvoteRating_upvoteRating_rating {
  __typename: "RatingType";
  upvoteCount: number | null;
}

export interface UpvoteRating_upvoteRating {
  __typename: "UpvoteRatingPayload";
  rating: UpvoteRating_upvoteRating_rating | null;
  errors: string | null;
}

export interface UpvoteRating {
  upvoteRating: UpvoteRating_upvoteRating | null;
}

export interface UpvoteRatingVariables {
  input: UpvoteRatingInput;
}
