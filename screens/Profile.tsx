import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { SharedStackNavParamList } from "../shared/shared.types";

type ProfileProps = NativeStackScreenProps<SharedStackNavParamList, "Profile">;

export default function Profile({
  navigation,
  route: { params },
}: ProfileProps) {
  useEffect(() => {
    if (params?.username) {
      navigation.setOptions({
        title: params.username,
      });
    }
  }, []);
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>Someones Profile</Text>
    </View>
  );
}
