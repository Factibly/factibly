import { ApolloClient, ApolloLink } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import cache from "../hooks/cache";

const httpLink = createUploadLink({
  uri: `${process.env.REACT_APP_GRAPHQL_CLIENT_URL}/graphql`,
  credentials: "include",
});

const client = new ApolloClient({
  link: (httpLink as unknown) as ApolloLink,
  cache: cache,
});

export default client;
