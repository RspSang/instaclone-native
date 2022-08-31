import React from "react";
import { FlatList, View } from "react-native";
import styled from "styled-components/native";
import ScreenLayout from "../components/ScreenLayout";
import { useSeeRoomsQuery } from "../generated/graphql";
import useMe from "../hooks/useMe";

const RoomContainer = styled.TouchableOpacity`
  width: 100%;
  padding: 15px 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Column = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 20px;
`;
const Data = styled.View``;
const UnreadDot = styled.View`
  width: 10px;
  border-radius: 5px;
  height: 10px;
  background-color: ${(props) => props.theme.activeColor};
`;
const Username = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  font-size: 16px;
`;
const UnreadText = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-top: 2px;
  font-weight: 500;
`;

interface IRoomRenderItemProps {
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
  const { data: meData } = useMe();
  const renderItem = (room: IRoomRenderItemProps | null) => {
    const notMe = room?.users?.find(
      (user) => user?.username !== meData?.me?.username
    );
    return (
      <RoomContainer>
        <Column>
          <Avatar source={{ uri: notMe?.avatar }} />
          <Data>
            <Username>{notMe?.username}</Username>
            <UnreadText>
              {room?.unreadTotal} unread{" "}
              {room?.unreadTotal === 1 ? "message" : "messages"}
            </UnreadText>
          </Data>
        </Column>
        <Column>{room?.unreadTotal !== 0 ? <UnreadDot /> : null}</Column>
      </RoomContainer>
    );
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
