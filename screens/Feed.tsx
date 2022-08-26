import { FlatList } from "react-native";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import { useSeeFeedQuery } from "../generated/graphql";

export default function Feed() {
  const { data, loading } = useSeeFeedQuery({ variables: { page: 1 } });
  const renderPhoto = ({ item: photo }: any) => {
    return <Photo {...photo} />;
  };
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeFeed}
        keyExtractor={(photo) => "" + photo?.id}
        renderItem={renderPhoto}
      />
    </ScreenLayout>
  );
}
