import { gql } from "@apollo/client";

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
