import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import { useSeeFeedQuery } from "../generated/graphql";
import { SharedStackNavParamList } from "../shared/shared.types";
import { Ionicons } from "@expo/vector-icons";
import { useReactiveVar } from "@apollo/client";
import { isDarkModeVar } from "../apollo";

type FeedProps = NativeStackScreenProps<SharedStackNavParamList>;

export default function Feed({ navigation }: FeedProps) {
  const isDarkMode: "light" | "dark" = useReactiveVar(isDarkModeVar);
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch, fetchMore } = useSeeFeedQuery({
    variables: { offset: 0 },
  });
  const renderPhoto = ({ item: photo }: any) => {
    return <Photo {...photo} />;
  };
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const MessagesButton = () => (
    <TouchableOpacity
      style={{ marginRight: 10 }}
      onPress={() => navigation.navigate("Messages")}
    >
      <Ionicons
        name="paper-plane-outline"
        color={isDarkMode === "dark" ? "white" : "black"}
        size={25}
      ></Ionicons>
    </TouchableOpacity>
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: MessagesButton,
    });
  }, []);
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReachedThreshold={0.05}
        onEndReached={() =>
          fetchMore({ variables: { offset: data?.seeFeed?.length } })
        }
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeFeed}
        keyExtractor={(photo) => "" + photo?.id}
        renderItem={renderPhoto}
      />
    </ScreenLayout>
  );
}
