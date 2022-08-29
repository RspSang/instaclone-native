import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { FlatList, View } from "react-native";
import { useSeePhotoLikesQuery } from "../generated/graphql";
import { SharedStackNavParamList } from "../shared/shared.types";
import ScreenLayout from "./ScreenLayout";
import UserRow from "./UserRow";

type LikesProps = NativeStackScreenProps<SharedStackNavParamList, "Likes">;

export default function Likes({ route: { params } }: LikesProps) {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useSeePhotoLikesQuery({
    variables: { id: params?.photoId },
    skip: !params?.photoId,
  });
  const renderUser = ({ item: user }: any) => <UserRow {...user} />;
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            }}
          ></View>
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={data?.seePhotoLikes}
        keyExtractor={(item) => "" + item?.id}
        renderItem={renderUser}
        style={{ width: "100%" }}
      />
    </ScreenLayout>
  );
}
