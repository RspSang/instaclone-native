import { useReactiveVar } from "@apollo/client";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { isDarkModeVar } from "../apollo";
import UploadForm from "../screens/UploadForm";
import TabsNav from "./TabsNav";
import UploadNav from "./UploadNav";

const Stack = createNativeStackNavigator();

export default function LoggedInNav() {
  const isDarkMode: "light" | "dark" = useReactiveVar(isDarkModeVar);
  return (
    <Stack.Navigator screenOptions={{ presentation: "fullScreenModal" }}>
      <Stack.Screen
        name="Tabs"
        component={TabsNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Upload"
        component={UploadNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UploadForm"
        options={{
          headerBackTitleVisible: false,
          title: "Upload",
          headerTintColor: isDarkMode === "light" ? "black" : "white",
          headerStyle: {
            backgroundColor: isDarkMode === "light" ? "white" : "black",
          },
        }}
        component={UploadForm}
      />
    </Stack.Navigator>
  );
}
