import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import { SharedStackNavParamList } from "../shared/shared.types";

const Column = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 25px;
  margin-right: 10px;
`;
const Username = styled.Text`
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`;
const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
`;
const FollowBtn = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.activeColor};
  justify-content: center;
  padding: 5px 10px;
  border-radius: 4px;
`;
const FollowBtnText = styled.Text`
  color: white;
  font-weight: 600;
`;

interface UserRowProps {
  id: number;
  avatar: string;
  username: string;
  isFollowing: boolean;
  isMe: boolean;
}

export default function UserRow({
  id,
  avatar,
  username,
  isFollowing,
  isMe,
}: UserRowProps) {
  const navigation: NativeStackNavigationProp<SharedStackNavParamList> =
    useNavigation();
  return (
    <Wrapper>
      <Column
        onPress={() =>
          navigation.navigate("Profile", {
            username,
            id,
          })
        }
      >
        <Avatar source={{ uri: avatar }} />
        <Username>{username}</Username>
      </Column>
      {!isMe ? (
        <FollowBtn>
          <FollowBtnText>{isFollowing ? "Unfollow" : "Follow"}</FollowBtnText>
        </FollowBtn>
      ) : null}
    </Wrapper>
  );
}
