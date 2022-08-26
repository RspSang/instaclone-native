import { useReactiveVar } from "@apollo/client";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import { isDarkModeVar } from "../apollo";
import Comments from "../components/Comments";
import Likes from "../components/Likes";
import Feed from "../screens/Feed";
import Me from "../screens/Me";
import Notifications from "../screens/Notifications";
import Photo from "../screens/Photo";
import Profile from "../screens/Profile";
import Search from "../screens/Search";

const Stack = createNativeStackNavigator();

interface StackNavigationProps {
  screenName: string;
}

const LogoContainer = styled.View`
  height: 40px;
`;

const LogoImage = styled.Image`
  width: 130px;
  height: 100%;
`;

export default function SharedStackNav({ screenName }: StackNavigationProps) {
  const isDarkMode: "light" | "dark" = useReactiveVar(isDarkModeVar);
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: isDarkMode === "light" ? "black" : "white",
        headerStyle: {
          backgroundColor: isDarkMode === "light" ? "white" : "black",
        },
      }}
    >
      {screenName === "Feed" ? (
        <Stack.Screen
          name="Feed"
          component={Feed}
          options={{
            headerTitle: () => (
              <LogoContainer>
                {isDarkMode === "dark" ? (
                  <LogoImage
                    source={require("../assets/instagram_logo_dark.png")}
                    resizeMode="contain"
                  ></LogoImage>
                ) : (
                  <LogoImage
                    source={require("../assets/instagram_logo_light.png")}
                    resizeMode="contain"
                  ></LogoImage>
                )}
              </LogoContainer>
            ),
          }}
        />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen name="Search" component={Search} />
      ) : null}
      {screenName === "Notifications" ? (
        <Stack.Screen name="Notifications" component={Notifications} />
      ) : null}
      {screenName === "Me" ? <Stack.Screen name="Me" component={Me} /> : null}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Photo" component={Photo} />
      <Stack.Screen name="Likes" component={Likes} />
      <Stack.Screen name="Comments" component={Comments} />
    </Stack.Navigator>
  );
}
