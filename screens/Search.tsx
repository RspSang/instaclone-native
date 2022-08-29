import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import { SharedStackNavParamList } from "../shared/shared.types";

type SearchProps = NativeStackScreenProps<SharedStackNavParamList, "Photo">;

export default function Search({ navigation }: SearchProps) {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("Photo")}>
        <Text>Photo</Text>
      </TouchableOpacity>
    </View>
  );
}
