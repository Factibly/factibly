import {
  useMutation,
  useQuery,
  MutationHookOptions,
  MutationFunctionOptions,
  QueryHookOptions,
  FetchResult,
  QueryResult,
  OperationVariables,
} from "@apollo/client";
import { DocumentNode } from "graphql";
import { RefreshToken } from "../gql/__generated__/RefreshToken";
import { REFRESH_TOKEN } from "../gql/mutations";
import { logoutUser } from "./state";

export function useCustomMutation<T, V extends Record<string, any> = any>(
  mutation: DocumentNode,
  options?: MutationHookOptions<T, V> | undefined
) {
  const [refreshTokenMutation] = useMutation<RefreshToken>(REFRESH_TOKEN);
  const [currMutation] = useMutation<T, V>(mutation, options);

  // define the type here so that code displays properly
  type MutationRes = Promise<FetchResult<T, Record<string, any>, Record<string, any>>>;

  const customMutation = async (options?: MutationFunctionOptions<T, V>): MutationRes => {
    try {
      return await currMutation(options);
    } catch (err) {
      if (err.toString().includes("permission")) {
        try {
          await refreshTokenMutation();
          return await currMutation(options);
        } catch (err) {
          logoutUser();
          throw err;
        }
      } else {
        throw err;
      }
    }
  };

  return [customMutation];
}

export function useCustomQuery<TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>
): QueryResult<TData, TVariables> {
  // TODO: we should check cookie expiry expiry before trying to refresh within here
  // const refresh = async () => {
  //   try {
  //     await client.mutate({ mutation: REFRESH_TOKEN });
  //   } catch (err) {
  //     // queres are accesible even if a user is not logged in
  //   }
  // };

  // refresh();

  return useQuery(query, options);
}
