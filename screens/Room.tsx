import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { FlatList, KeyboardAvoidingView } from "react-native";
import styled from "styled-components/native";
import ScreenLayout from "../components/ScreenLayout";
import { useSeeRoomQuery } from "../generated/graphql";
import { SharedStackNavParamList } from "../shared/shared.types";

type RoomProps = NativeStackScreenProps<SharedStackNavParamList, "Room">;

const MessageContainer = styled.View<{ outGoing: boolean }>`
  padding: 0px 10px;
  flex-direction: ${(props) => (props.outGoing ? "row-reverse" : "row")};
  align-items: flex-end;
  margin: 3px 0px;
`;
const Author = styled.View``;
const Avatar = styled.Image`
  height: 20px;
  width: 20px;
  border-radius: 25px;
`;
const Message = styled.Text`
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.inputBgColor};
  padding: 5px 10px;
  overflow: hidden;
  border-radius: 10px;
  font-size: 16px;
  margin: 0px 10px;
`;
const TextInput = styled.TextInput`
  margin-bottom: 50px;
  margin-top: 25px;
  width: 95%;
  border: 1px solid ${(props) => props.theme.inputBgColor};
  padding: 10px 20px;
  color: ${(props) => props.theme.textColor};
  border-radius: 1000px;
`;

export default function Room({ route: { params }, navigation }: RoomProps) {
  const { data, loading } = useSeeRoomQuery({
    variables: {
      id: params?.id,
    },
  });

  const renderItem = ({ item: message }: any) => (
    <MessageContainer
      outGoing={message.user.username !== params?.talkingTo?.username}
    >
      <Author>
        <Avatar source={{ uri: message.user.avatar }} />
      </Author>
      <Message>{message.payload}</Message>
    </MessageContainer>
  );

  useEffect(() => {
    navigation.setOptions({
      title: `${params?.talkingTo?.username}`,
    });
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "black" }}
      behavior="padding"
      keyboardVerticalOffset={50}
    >
      <ScreenLayout loading={loading}>
        <FlatList
          inverted
          style={{ width: "100%" }}
          data={data?.seeRoom?.messages}
          keyExtractor={(message) => "" + message?.id}
          renderItem={renderItem}
        />
        <TextInput
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          placeholder="Write a message..."
          returnKeyLabel="Send Message"
          returnKeyType="send"
        />
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
}
