import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import {  SharedStackNavParamList } from "../shared/shared.types";

type Props = NativeStackScreenProps<SharedStackNavParamList, "Profile">;

export default function Photo({ navigation }: Props) {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Text>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
