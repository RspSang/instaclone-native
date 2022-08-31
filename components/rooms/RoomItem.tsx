import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import useMe from "../../hooks/useMe";
import { IRoomRenderItemProps } from "../../screens/Rooms";
import { SharedStackNavParamList } from "../../shared/shared.types";

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

type RoomScreenProps = NativeStackNavigationProp<SharedStackNavParamList>;

export default function RoomItem({
  users,
  unreadTotal,
  id,
}: IRoomRenderItemProps) {
  const navigation = useNavigation<RoomScreenProps>();
  const { data: meData } = useMe();
  const talkingTo = users?.find(
    (user) => user?.username !== meData?.me?.username
  );
  const goToRoom = () => navigation.navigate("Room", { id, talkingTo });
  return (
    <RoomContainer onPress={goToRoom}>
      <Column>
        <Avatar source={{ uri: talkingTo?.avatar }} />
        <Data>
          <Username>{talkingTo?.username}</Username>
          <UnreadText>
            {unreadTotal} unread {unreadTotal === 1 ? "message" : "messages"}
          </UnreadText>
        </Data>
      </Column>
      <Column>{unreadTotal !== 0 ? <UnreadDot /> : null}</Column>
    </RoomContainer>
  );
}
