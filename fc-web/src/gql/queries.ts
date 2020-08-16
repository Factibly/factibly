import { gql } from "@apollo/client";

export const USER_LOGGED_IN = gql`
  query userLoggedIn {
    userLoggedIn @client
  }
`;

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      displayName
      email
      country
    }
  }
`;

export const CONTENT = gql`
  query Content($contentId: ID!) {
    content(contentId: $contentId) {
      url
      overallScore
      author
      searchCount
      title
      imageUrl
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
      }
    }
  }
`;
