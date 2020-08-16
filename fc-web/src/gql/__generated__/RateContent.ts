/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RateContentInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: RateContent
// ====================================================

export interface RateContent_rateContent_rating {
  __typename: "RatingType";
  /**
   * The ID of the object.
   */
  id: string;
  score1: number;
  score2: number;
  score3: number;
  justification: string | null;
}

export interface RateContent_rateContent {
  __typename: "RateContentPayload";
  rating: RateContent_rateContent_rating | null;
  errors: string | null;
}

export interface RateContent {
  rateContent: RateContent_rateContent | null;
}

export interface RateContentVariables {
  input: RateContentInput;
}
