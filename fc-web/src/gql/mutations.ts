import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation TokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
    }
  }
`;

export const REGISTER = gql`
  mutation CreateUser(
    $email: String!
    $password: String!
    $dateOfBirth: Date!
    $firstName: String!
    $lastName: String!
    $displayName: String!
    $country: String!
    $recaptchaToken: String!
  ) {
    createUser(
      email: $email
      password: $password
      dateOfBirth: $dateOfBirth
      firstName: $firstName
      lastName: $lastName
      displayName: $displayName
      country: $country
      recaptchaToken: $recaptchaToken
    ) {
      user {
        id
        email
      }
    }
  }
`;

export const SEARCH = gql`
  mutation CreateContent($url: String!) {
    createContent(url: $url) {
      content {
        id
        url
      }
    }
  }
`;

export const RATING = gql`
  mutation RateContent($contentId: ID!, $score1: Float!, $score2: Float!, $score3: Float!, $justification: String!) {
    rateContent(
      contentId: $contentId
      score1: $score1
      score2: $score2
      score3: $score3
      justification: $justification
    ) {
      rating {
        id
        score1
        score2
        score3
        justification
      }
    }
  }
`;

export const RATING_UPVOTE = gql`
  mutation UpvoteRating($ratingId: ID!) {
    upvoteRating(ratingId: $ratingId) {
      rating {
        upvoteCount
      }
    }
  }
`;

export const RATING_DOWNVOTE = gql`
  mutation DownvoteRating($ratingId: ID!) {
    downvoteRating(ratingId: $ratingId) {
      rating {
        downvoteCount
      }
    }
  }
`;
