import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const httpLink = createHttpLink({
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

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        seeFeed: offsetLimitPagination(),
      },
    },
  },
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export default client;
