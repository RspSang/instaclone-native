import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Text, View } from "react-native";
import useMe from "../hooks/useMe";
import { SharedStackNavParamList } from "../shared/shared.types";

type MeProps = NativeStackScreenProps<SharedStackNavParamList, "Me">;

export default function Me({ navigation }: MeProps) {
  const { data } = useMe();
  useEffect(() => {
    navigation.setOptions({ title: data?.me?.username });
  }, [data]);
  return (
    <View>
      <Text>Me</Text>
    </View>
  );
}
