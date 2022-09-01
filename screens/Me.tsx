import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { isLoggedInVar, tokenVar } from "../apollo";
import useMe from "../hooks/useMe";
import { SharedStackNavParamList } from "../shared/shared.types";

type MeProps = NativeStackScreenProps<SharedStackNavParamList, "Me">;

export default function Me({ navigation }: MeProps) {
  const { data } = useMe();
  useEffect(() => {
    navigation.setOptions({ title: data?.me?.username });
  }, [data]);
  const handleLogout = async () => {
    const keys = ["token", "loggedIn"];
    await AsyncStorage.multiRemove(keys);
    tokenVar("");
    isLoggedInVar(false);
  };
  return (
    <View>
      <TouchableOpacity onPress={handleLogout}>
        <Text>logout</Text>
      </TouchableOpacity>
    </View>
  );
}
