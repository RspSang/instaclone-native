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
import { StatusBar } from "expo-status-bar";

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

type SelectPhotoProps = NativeStackScreenProps<SharedStackNavParamList>;

export default function SelectPhoto({ navigation }: SelectPhotoProps) {
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  const [chosenPhoto, setChosenPhoto] = useState("");
  const [photoLocal, setPhotoLocal] = useState("");
  const numColumns = 4;
  const { width } = useWindowDimensions();

  const choosePhoto = async (id: string) => {
    const assetInfo = await MediaLibrary.getAssetInfoAsync(id);
    setPhotoLocal(assetInfo.localUri!);
    setChosenPhoto(assetInfo.uri);
  };

  const getPhotos = async () => {
    const { assets: photos } = await MediaLibrary.getAssetsAsync();
    setPhotos(photos);
    setChosenPhoto(photos[0]?.uri);
    choosePhoto(photos[0]?.id);
  };

  const getPermissions = async () => {
    const { status, canAskAgain } = await MediaLibrary.getPermissionsAsync();
    if (status === "undetermined" && canAskAgain) {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "undetermined") {
        getPhotos();
      }
    } else if (status !== "undetermined") {
      getPhotos();
    }
  };

  const headerRight = () => (
    <TouchableOpacity
      onPress={() => navigation.navigate("UploadForm", { file: photoLocal })}
    >
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  
  useEffect(() => {
    getPermissions();
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerRight,
    });
  }, [chosenPhoto, photoLocal]);

  const renderItem = ({ item: photo }: any) => (
    <ImageContainer onPress={() => choosePhoto(photo.id)}>
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
      <StatusBar hidden={false} />
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
