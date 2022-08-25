import {
  ApolloClient,
  InMemoryCache,
  makeVar,
  NormalizedCacheObject,
} from "@apollo/client";

export const isLoggedInVar = makeVar(false);
export const isDarkModeVar = makeVar<"light" | "dark">("light");

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: "https://fcd3-126-107-180-162.jp.ngrok.io/graphql",
  cache: new InMemoryCache(),
});

export default client;
