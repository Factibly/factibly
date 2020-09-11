import { gql } from "@apollo/client";

export const LOGGED_IN = gql`
  query LoggedIn {
    currentUser {
      id
    }
  }
`;

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      displayName
      email
      country
      avatar
    }
  }
`;

export const CONTENT = gql`
  query Content($contentId: ID!) {
    content(id: $contentId) {
      id
      url
      overallScore
      updatedAt
      author
      searchCount
      title
      imageUrl
      imageModerationScore
      isBookmarked
      ratingSet {
        id
        createdAt
        updatedAt
        score1
        score2
        score3
        justification
        upvoteCount
        downvoteCount
        isUpvoted
        isDownvoted
        user {
          id
          displayName
          country
        }
      }
      userRating {
        id
        score1
        score2
        score3
        justification
        createdAt
        upvoteCount
        downvoteCount
      }
    }
  }
`;

export const CONTENT_RATING_TEMPORAL_TRENDS_LIST = gql`
  query ContentRatingTemporalTrendsList($contentId: ID!) {
    content(id: $contentId) {
      id
      ratingTemporalTrendsSet {
        monthsAgo
        score1Mean
        score2Mean
        score3Mean
        overallMean
      }
    }
  }
`;

export const CONTENT_REFERENCES_LIST = gql`
  query ContentReferencesList($contentId: ID!) {
    content(id: $contentId) {
      id
      referenceSet {
        style
        reference
      }
    }
  }
`;

export const BOOKMARKS_LIST = gql`
  query BookmarksList {
    currentUser {
      id
      bookmarks {
        id
        url
        imageUrl
        title
        overallScore
      }
    }
  }
`;
