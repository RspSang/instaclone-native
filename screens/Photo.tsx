import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import {  SharedStackNavParamList } from "../shared/shared.types";

type PhotoProps = NativeStackScreenProps<SharedStackNavParamList, "Profile">;

export default function Photo({ navigation }: PhotoProps) {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Text>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
