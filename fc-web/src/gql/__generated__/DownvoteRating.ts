/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DownvoteRatingInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: DownvoteRating
// ====================================================

export interface DownvoteRating_downvoteRating_rating {
  __typename: "RatingType";
  downvoteCount: number | null;
}

export interface DownvoteRating_downvoteRating {
  __typename: "DownvoteRatingPayload";
  rating: DownvoteRating_downvoteRating_rating | null;
  errors: string | null;
}

export interface DownvoteRating {
  downvoteRating: DownvoteRating_downvoteRating | null;
}

export interface DownvoteRatingVariables {
  input: DownvoteRatingInput;
}
