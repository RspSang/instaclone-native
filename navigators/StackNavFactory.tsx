import { useReactiveVar } from "@apollo/client";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { isDarkModeVar } from "../apollo";
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

export default function StackNavFactory({ screenName }: StackNavigationProps) {
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
        <Stack.Screen name="Feed" component={Feed} />
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
    </Stack.Navigator>
  );
}
