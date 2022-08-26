import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../shared/shared.types";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export default function Photo({ navigation }: Props) {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Text>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
