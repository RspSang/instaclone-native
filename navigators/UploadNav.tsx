import { useReactiveVar } from "@apollo/client";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { isDarkModeVar } from "../apollo";
import SelectPhoto from "../screens/SelectPhoto";
import TakePhoto from "../screens/TakePhoto";
import { RootStackParamList } from "../shared/shared.types";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

type UploadNavProps = NativeStackScreenProps<RootStackParamList>;

export default function UploadNav({ navigation }: UploadNavProps) {
  const isDarkMode: "light" | "dark" = useReactiveVar(isDarkModeVar);
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDarkMode === "light" ? "white" : "black",
        },
        tabBarActiveTintColor: isDarkMode === "light" ? "black" : "white",
        tabBarIndicatorStyle: {
          backgroundColor: isDarkMode === "light" ? "black" : "white",
          top: 0,
        },
      }}
    >
      <Tab.Screen name="TabSelect" options={{ title: "Select" }}>
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: isDarkMode === "light" ? "white" : "black",
              },
              headerTintColor: isDarkMode === "light" ? "black" : "white",
              headerLeft: () => (
                <Ionicons
                  onPress={() => navigation.navigate("Tabs")}
                  color={isDarkMode === "light" ? "black" : "white"}
                  name="close"
                  size={28}
                  style={{ left: -10 }}
                />
              ),
            }}
          >
            <Stack.Screen name="SelectPhoto" component={SelectPhoto} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Take" component={TakePhoto} />
    </Tab.Navigator>
  );
}
