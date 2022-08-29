import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { RefreshControl } from "react-native";
import styled from "styled-components/native";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import { useSeePhotoQuery } from "../generated/graphql";
import { SharedStackNavParamList } from "../shared/shared.types";

const ScrollView = styled.ScrollView`
  background-color: ${(props) => props.theme.bgColor};
`;

type PhotoProps = NativeStackScreenProps<SharedStackNavParamList, "Photo">;

export default function PhotoScreen({ route: { params } }: PhotoProps) {
  const { data, loading, refetch } = useSeePhotoQuery({
    variables: { id: params.photoId },
  });
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <ScreenLayout loading={loading}>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      >
        <Photo {...data?.seePhoto} />
      </ScrollView>
    </ScreenLayout>
  );
}
