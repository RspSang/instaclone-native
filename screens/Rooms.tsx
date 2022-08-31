import React from "react";
import { FlatList, View } from "react-native";
import styled from "styled-components/native";
import RoomItem from "../components/rooms/RoomItem";
import ScreenLayout from "../components/ScreenLayout";
import { useSeeRoomsQuery } from "../generated/graphql";

export interface IRoomRenderItemProps {
  __typename?: "Room" | undefined;
  id: number;
  unreadTotal: number;
  users?:
    | ({
        __typename?: "User" | undefined;
        username: string;
        avatar?: string | null | undefined;
      } | null)[]
    | null
    | undefined;
}

export default function Rooms() {
  const { data, loading } = useSeeRoomsQuery();
  const renderItem = (room: IRoomRenderItemProps | null) => {
    if (!room) return null;
    return <RoomItem {...room} />;
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
        style={{ width: "100%" }}
        data={data?.seeRooms}
        keyExtractor={(room) => "" + room?.id}
        renderItem={({ item }) => renderItem(item)}
      />
    </ScreenLayout>
  );
}
