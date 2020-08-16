import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      payload
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation RefreshToken {
    refreshToken {
      payload
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    deleteRefreshTokenCookie {
      deleted
    }
    deleteTokenCookie {
      deleted
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        id
        email
      }
    }
  }
`;

export const SEARCH_CONTENT = gql`
  mutation SearchContent($input: SearchContentInput!) {
    searchContent(input: $input) {
      content {
        id
        url
      }
      errors
    }
  }
`;

export const RATE_CONTENT = gql`
  mutation RateContent($input: RateContentInput!) {
    rateContent(input: $input) {
      rating {
        id
        score1
        score2
        score3
        justification
      }
      errors
    }
  }
`;

export const UPVOTE_RATING = gql`
  mutation UpvoteRating($input: UpvoteRatingInput!) {
    upvoteRating(input: $input) {
      rating {
        upvoteCount
      }
      errors
    }
  }
`;

export const DOWNVOTE_RATING = gql`
  mutation DownvoteRating($input: DownvoteRatingInput!) {
    downvoteRating(input: $input) {
      rating {
        downvoteCount
      }
      errors
    }
  }
`;

export const BOOKMARK_CONTENT = gql`
  mutation BookmarkContent($input: BookmarkContentInput!) {
    bookmarkContent(input: $input) {
      bookmarked
      errors
    }
  }
`;

export const REMOVE_BOOKMARK = gql`
  mutation RemoveBookmark($input: RemoveBookmarkInput!) {
    removeBookmark(input: $input) {
      removed
      errors
    }
  }
`;
