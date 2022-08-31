import { useReactiveVar } from "@apollo/client";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { isDarkModeVar } from "../apollo";
import Room from "../screens/Room";
import Rooms from "../screens/Rooms";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../shared/shared.types";

const Stack = createNativeStackNavigator();

type MessagesNavProps = NativeStackScreenProps<RootStackParamList>;

export default function MessagesNav({ navigation }: MessagesNavProps) {
  const isDarkMode: "light" | "dark" = useReactiveVar(isDarkModeVar);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: isDarkMode === "light" ? "black" : "white",
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: isDarkMode === "light" ? "white" : "black",
        },
        headerLeft: ({ tintColor }) => (
          <Ionicons
            color={tintColor}
            name="chevron-down"
            size={28}
            onPress={() => navigation.goBack()}
          />
        ),
      }}
    >
      <Stack.Screen name="Rooms" component={Rooms} />
      <Stack.Screen name="Room" component={Room} />
    </Stack.Navigator>
  );
}
