import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ReactNativeFile } from "apollo-upload-client";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { useUploadPhotoMutation } from "../generated/graphql";
import { SharedStackNavParamList } from "../shared/shared.types";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.bgColor};
  padding: 0px 50px;
`;
const Photo = styled.Image`
  height: 350px;
`;
const CaptionContainer = styled.View`
  margin-top: 30px;
`;
const Caption = styled.TextInput`
  background-color: ${(props) => props.theme.inputBgColor};
  color: ${(props) => props.theme.textColor};
  padding: 10px 20px;
  border-radius: 100px;
`;

const HeaderRightText = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

const LoadingIndicator = styled.ActivityIndicator`
  color: ${(props) => props.theme.textColor};
`;

type TakePhotoProps = NativeStackScreenProps<
  SharedStackNavParamList,
  "UploadForm"
>;

interface CaptionFormData {
  caption: string;
}

export default function UploadForm({
  route: { params },
  navigation,
}: TakePhotoProps) {
  const { control, handleSubmit } = useForm<CaptionFormData>();
  const [uploadPhotoMutation, { loading }] = useUploadPhotoMutation({
    update: (cache, result) => {
      if (!result.data?.uploadPhoto) return;
      const {
        data: { uploadPhoto },
      } = result;
      if (uploadPhoto.id) {
        cache.modify({
          id: "ROOT_QUERY",
          fields: {
            seeFeed(prev) {
              return [uploadPhoto, ...prev];
            },
          },
        });
        navigation.navigate("Tabs");
      }
    },
  });

  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  const HeaderRightLoading = () => (
    <LoadingIndicator size="small" color="white" style={{ marginRight: 10 }} />
  );

  const onValid = ({ caption }: CaptionFormData) => {
    const file = new ReactNativeFile({
      uri: params.file,
      name: `1.jpg`,
      type: "image/jpeg",
    });
    uploadPhotoMutation({
      variables: {
        caption,
        file,
      },
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
      headerLeft: loading
        ? () => null
        : ({ tintColor }) => (
            <Ionicons
              color={tintColor}
              name="close"
              size={28}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
    });
  }, [loading]);

  return (
    <DismissKeyboard>
      <Container>
        <Photo resizeMode="contain" source={{ uri: params.file }} />
        <CaptionContainer>
          <Controller
            name="caption"
            control={control}
            rules={{ required: true, minLength: 1, maxLength: 100 }}
            render={({ field: { onChange, value } }) => (
              <Caption
                value={value}
                onChangeText={onChange}
                onSubmitEditing={handleSubmit(onValid)}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                placeholder="Write a caption..."
                placeholderTextColor="gray"
              />
            )}
          />
        </CaptionContainer>
      </Container>
    </DismissKeyboard>
  );
}
