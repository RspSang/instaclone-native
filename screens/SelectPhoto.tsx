import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components/native";
import {
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SharedStackNavParamList } from "../shared/shared.types";

const Container = styled.View`
  flex: 1;
`;

const Top = styled.View`
  flex: 1;
`;

const Bottom = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.bgColor};
`;

const ImageContainer = styled.TouchableOpacity``;
const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 0px;
`;
const HeaderRightText = styled.Text`
  color: ${(props) => props.theme.activeColor};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

type SelectPhotoProps = NativeStackScreenProps<
  SharedStackNavParamList,
  "SelectPhoto"
>;

export default function SelectPhoto({ navigation }: SelectPhotoProps) {
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  const [chosenPhoto, setChosenPhoto] = useState("");
  const getPhotos = async () => {
    const { assets: photos } = await MediaLibrary.getAssetsAsync();
    setPhotos(photos);
    setChosenPhoto(photos[0]?.uri);
  };
  const getPermissions = async () => {
    const { status } = await MediaLibrary.getPermissionsAsync();
    if (status !== "granted") {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      if (accessPrivileges !== "none") {
        getPhotos();
      }
    } else if (status === "granted") {
      getPhotos();
    }
  };
  const HeaderRight = () => (
    <TouchableOpacity>
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  useEffect(() => {
    getPermissions();
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, []);
  const numColumns = 4;
  const { width } = useWindowDimensions();
  const choosePhoto = (uri: string) => {
    setChosenPhoto(uri);
  };
  const renderItem = ({ item: photo }: any) => (
    <ImageContainer onPress={() => choosePhoto(photo.uri)}>
      <Image
        source={{ uri: photo.uri }}
        style={{ width: width / numColumns, height: 100 }}
      />
      <IconContainer>
        <Ionicons
          name="checkmark-circle"
          size={18}
          color={photo.uri === chosenPhoto ? "#0095F6" : "white"}
        />
      </IconContainer>
    </ImageContainer>
  );
  return (
    <Container>
      <Top>
        {chosenPhoto !== "" ? (
          <Image
            source={{ uri: chosenPhoto }}
            style={{ width, height: "100%" }}
          />
        ) : null}
      </Top>
      <Bottom>
        <FlatList
          data={photos}
          numColumns={numColumns}
          keyExtractor={(photo) => photo.id}
          renderItem={renderItem}
        />
      </Bottom>
    </Container>
  );
}
