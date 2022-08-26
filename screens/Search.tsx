import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../shared/shared.types";

type Props = NativeStackScreenProps<RootStackParamList, "Photo">;

export default function Search({ navigation }: Props) {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("Photo")}>
        <Text>Photo</Text>
      </TouchableOpacity>
    </View>
  );
}
