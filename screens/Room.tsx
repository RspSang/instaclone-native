import { gql, Reference, useApolloClient } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FlatList, KeyboardAvoidingView, View } from "react-native";
import styled from "styled-components/native";
import ScreenLayout from "../components/ScreenLayout";
import {
  RoomUpdatesDocument,
  useSeeRoomQuery,
  useSendMessageMutation,
} from "../generated/graphql";
import useMe from "../hooks/useMe";
import { SharedStackNavParamList } from "../shared/shared.types";
import { Ionicons } from "@expo/vector-icons";

type RoomProps = NativeStackScreenProps<SharedStackNavParamList, "Room">;

interface MessageFormData {
  message: string;
}

const MessageContainer = styled.View<{ outGoing: boolean }>`
  padding: 0px 10px;
  flex-direction: ${(props) => (props.outGoing ? "row-reverse" : "row")};
  align-items: flex-end;
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
  border: 1px solid ${(props) => props.theme.inputBgColor};
  padding: 10px 20px;
  color: ${(props) => props.theme.textColor};
  border-radius: 1000px;
  width: 90%;
  margin-right: 10px;
`;

const InputContainer = styled.View`
  width: 95%;
  margin-bottom: 50px;
  margin-top: 25px;
  flex-direction: row;
  align-items: center;
`;

const SendButton = styled.TouchableOpacity``;

export default function Room({ route: { params }, navigation }: RoomProps) {
  const [subscribed, setSubscribed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { data: meData } = useMe();
  const { control, handleSubmit, getValues, setValue, watch } =
    useForm<MessageFormData>();
  const [sendMessageMutation, { loading: sendingMessageLoading }] =
    useSendMessageMutation({
      update: (cache, result) => {
        if (!result.data?.sendMessage) return;
        const {
          data: {
            sendMessage: { ok, id },
          },
        } = result;
        if (ok && meData) {
          const { message } = getValues();
          setValue("message", "");
          const messageObj = {
            id,
            payload: message,
            user: {
              username: meData.me?.username,
              avatar: meData.me?.avatar,
            },
            read: true,
            __typename: "Message",
          };
          const incomingMessage = cache.writeFragment({
            fragment: gql`
              fragment NewMessage on Message {
                id
                payload
                user {
                  username
                  avatar
                }
                read
              }
            `,
            data: messageObj,
          });
          cache.modify({
            id: `Room:${params.id}`,
            fields: {
              messages(prev) {
                const existingMessage = prev.find(
                  (aMessage: Reference) =>
                    aMessage.__ref === incomingMessage?.__ref
                );
                if (existingMessage) {
                  return prev;
                }
                return [...prev, incomingMessage];
              },
            },
          });
        }
      },
    });

  const { data, loading, refetch, subscribeToMore } = useSeeRoomQuery({
    variables: {
      id: params?.id,
    },
  });

  const onRefresh = async (): Promise<void> => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

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

  const onValid = ({ message }: MessageFormData) => {
    if (!sendingMessageLoading) {
      sendMessageMutation({
        variables: { payload: message, roomId: params.id },
      });
    }
  };

  const client = useApolloClient();

  useEffect(() => {
    if (data?.seeRoom && !subscribed) {
      subscribeToMore({
        document: RoomUpdatesDocument,
        variables: { id: params.id },
        updateQuery: (prevQuery, options: any): any => {
          const {
            subscriptionData: {
              data: { roomUpdates: message },
            },
          } = options;
          if (message.id) {
            const incomingMessage = client.cache.writeFragment({
              fragment: gql`
                fragment NewMessage on Message {
                  id
                  payload
                  user {
                    username
                    avatar
                  }
                  read
                }
              `,
              data: message,
            });
            client.cache.modify({
              id: `Room:${params.id}`,
              fields: {
                messages(prev) {
                  return [...prev, incomingMessage];
                },
              },
            });
          }
        },
      });
      setSubscribed(true);
    }
  }, [data, subscribed]);

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
          style={{ width: "100%", paddingVertical: 10 }}
          inverted
          refreshing={refreshing}
          onRefresh={onRefresh}
          ItemSeparatorComponent={() => <View style={{ height: 13 }}></View>}
          data={[...(data?.seeRoom?.messages || [])].reverse()}
          keyExtractor={(message) => "" + message?.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
        <InputContainer>
          <Controller
            name="message"
            control={control}
            rules={{ required: true, minLength: 1, maxLength: 80 }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onSubmitEditing={handleSubmit(onValid)}
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyLabel="Send Message"
                returnKeyType="send"
                placeholder="Write a message..."
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                maxLength={80}
              />
            )}
          />
          <SendButton
            onPress={handleSubmit(onValid)}
            disabled={Boolean(watch("message")) === false}
          >
            <Ionicons
              name="send"
              color={watch("message") !== "" ? "dodgerblue" : "lightgray"}
              size={22}
            />
          </SendButton>
        </InputContainer>
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
}
