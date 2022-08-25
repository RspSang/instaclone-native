import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import LoggedOutNav from "./navigators/LoggedOutNav";
import { Appearance, ColorSchemeName } from "react-native";
import { darkTheme, lightTheme } from "./styles/styles";
import { ThemeProvider } from "styled-components/native";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { isDarkModeVar, isLoggedInVar } from "./apollo";
import LoggedInNav from "./navigators/LoggedInNav";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);
  const isDarkMode: "light" | "dark" = useReactiveVar(isDarkModeVar);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Ionicons.font);
        await Asset.loadAsync(require("./assets/instagram_logo_dark.png"));
        await Asset.loadAsync(require("./assets/instagram_logo_light.png"));
        const colorSchemeName: ColorSchemeName = Appearance.getColorScheme();
        isDarkModeVar(colorSchemeName === "light" ? "light" : "dark");
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={isDarkMode === "light" ? lightTheme : darkTheme}>
        <NavigationContainer>
          {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
        </NavigationContainer>
      </ThemeProvider>
    </ApolloProvider>
  );
}
