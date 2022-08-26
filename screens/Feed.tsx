import { useState } from "react";
import { FlatList } from "react-native";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import { useSeeFeedQuery } from "../generated/graphql";

export default function Feed() {
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
  const [refreshing, setRefreshing] = useState(false);
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
