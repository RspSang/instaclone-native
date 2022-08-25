import {
  ApolloClient,
  InMemoryCache,
  makeVar,
  NormalizedCacheObject,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");
export const logUserIn = async (token: string) => {
  await AsyncStorage.multiSet([
    ["token", token],
    ["loggedIn", "yes"],
  ]);
  isLoggedInVar(true);
  tokenVar(token);
};
export const isDarkModeVar = makeVar<"light" | "dark">("light");

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: "https://fcd3-126-107-180-162.jp.ngrok.io/graphql",
  cache: new InMemoryCache(),
});

export default client;
