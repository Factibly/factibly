/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ContentRatingTemporalTrendsList
// ====================================================

export interface ContentRatingTemporalTrendsList_content_ratingTemporalTrendsSet {
  __typename: "MonthlySummaryType";
  monthsAgo: number;
  score1Mean: number | null;
  score2Mean: number | null;
  score3Mean: number | null;
  overallMean: number | null;
}

export interface ContentRatingTemporalTrendsList_content {
  __typename: "ContentType";
  /**
   * The ID of the object
   */
  id: string;
  ratingTemporalTrendsSet: (ContentRatingTemporalTrendsList_content_ratingTemporalTrendsSet | null)[] | null;
}

export interface ContentRatingTemporalTrendsList {
  content: ContentRatingTemporalTrendsList_content | null;
}

export interface ContentRatingTemporalTrendsListVariables {
  contentId: string;
}
