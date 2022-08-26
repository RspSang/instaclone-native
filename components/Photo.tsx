import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SharedStackNavParamList } from "../shared/shared.types";
import { isDarkModeVar } from "../apollo";
import { useReactiveVar } from "@apollo/client";

const Container = styled.View``;
const Header = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;
const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
`;
const Username = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
`;
const File = styled.Image``;
const Actions = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Action = styled.TouchableOpacity`
  margin-right: 10px;
`;
const Caption = styled.View`
  flex-direction: row;
`;
const CaptionText = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-left: 5px;
`;
const Likes = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin: 7px 0px;
  font-weight: 600;
`;
const ExtraContainer = styled.View`
  padding: 10px;
`;

interface PhotoProps {
  id?: number;
  user?: { username: string; avatar?: string | null } | null;
  file?: string;
  caption?: string | null;
  likes?: number;
  // comments?: (IComment | null)[] | null;
  createdAt?: string;
  isMine?: boolean;
  isLiked?: boolean;
}

export default function Photo({
  id,
  user,
  caption,
  file,
  isLiked,
  likes,
}: PhotoProps) {
  const isDarkMode: "light" | "dark" = useReactiveVar(isDarkModeVar);
  const { width, height } = useWindowDimensions();
  const navigation: NativeStackNavigationProp<SharedStackNavParamList, "Feed"> =
    useNavigation();
  return (
    <Container>
      <Header onPress={() => navigation.navigate("Profile")}>
        <UserAvatar resizeMode="cover" source={{ uri: user?.avatar }} />
        <Username>{user?.username}</Username>
      </Header>
      <File
        style={{
          width,
          height: height - 500,
        }}
        source={{ uri: file }}
      />
      <ExtraContainer>
        <Actions>
          <Action>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              color={
                isLiked ? "tomato" : isDarkMode === "light" ? "black" : "white"
              }
              size={22}
            />
          </Action>
          <Action onPress={() => navigation.navigate("Comments")}>
            <Ionicons
              name="chatbubble-outline"
              color={isDarkMode === "light" ? "black" : "white"}
              size={22}
            />
          </Action>
        </Actions>
        <TouchableOpacity onPress={() => navigation.navigate("Likes")}>
          <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
        </TouchableOpacity>
        <Caption>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Username>{user?.username}</Username>
          </TouchableOpacity>
          <CaptionText>{caption}</CaptionText>
        </Caption>
      </ExtraContainer>
    </Container>
  );
}
