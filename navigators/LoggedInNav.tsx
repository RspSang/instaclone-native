import { useReactiveVar } from "@apollo/client";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { isDarkModeVar } from "../apollo";
import TabIcon from "../components/nav/TabIcon";
import { View } from "react-native";
import StackNavFactory from "./StackNavFactory";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  const isDarkMode: "light" | "dark" = useReactiveVar(isDarkModeVar);
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: isDarkMode === "light" ? "white" : "black",
          borderTopColor: "rgba(255,255,255,0.5)",
        },
        tabBarActiveTintColor: isDarkMode === "light" ? "black" : "white",
      }}
    >
      <Tabs.Screen
        name="TabFeed"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName={"home"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Feed" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="TabSearch"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName={"search"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Search" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Camera"
        component={View}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName={"camera"} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="TabNotifications"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName={"heart"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Notifications" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="TabMe"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName={"person"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Me" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
