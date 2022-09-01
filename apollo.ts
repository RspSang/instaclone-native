import {
  ApolloClient,
  InMemoryCache,
  makeVar,
  NormalizedCacheObject,
  split,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import {
  getMainDefinition,
  offsetLimitPagination,
} from "@apollo/client/utilities";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUploadLink } from "apollo-upload-client";
import { WebSocketLink } from "@apollo/client/link/ws";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");
export const isDarkModeVar = makeVar<"light" | "dark">("light");

const TOKEN = "token";

export const logUserIn = async (token: string) => {
  await AsyncStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
  tokenVar(token);
};

export const logUserOut = async () => {
  await AsyncStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  tokenVar(undefined);
};

const uploadHttpLink = createUploadLink({
  uri: "https://2aef-126-107-180-162.jp.ngrok.io/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(`GraphQL Error`, graphQLErrors);
  }
  if (networkError) {
    console.log("Network Error", networkError);
  }
});

const wsLink = new WebSocketLink({
  uri: "ws://2aef-126-107-180-162.jp.ngrok.io/graphql",
  options: {
    reconnect: true,
    connectionParams: () => ({ token: tokenVar() }),
  },
});

const httpLinks = authLink.concat(onErrorLink).concat(uploadHttpLink);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLinks
);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        seeFeed: offsetLimitPagination(),
      },
    },
    User: {
      keyFields: (obj) => `User:${obj.username}`,
    },
    Room: {
      fields: {
        messages: {
          merge: (existing = [], incoming) => [...existing, ...incoming],
        },
      },
    },
  },
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: splitLink,
  cache,
});

export default client;
