import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { useSearchPhotosLazyQuery } from "../generated/graphql";
import { SharedStackNavParamList } from "../shared/shared.types";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.bgColor};
`;

const MessageContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const MessageText = styled.Text`
  margin-top: 15px;
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
`;

const Input = styled.TextInput<{ width: number }>`
  padding: 8px 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.searchBgColor};
  color: ${(props) => props.theme.textColor};
  width: ${(props) => props.width / 1.5}px;
`;

type SearchProps = NativeStackScreenProps<SharedStackNavParamList, "Search">;

interface FormData {
  keyword: string;
}

export default function Search({ navigation }: SearchProps) {
  const numColumns = 4;
  const { width } = useWindowDimensions();
  const { control, getValues } = useForm<FormData>({
    defaultValues: { keyword: "" },
  });

  const [startQueryFn, { data, loading, called }] = useSearchPhotosLazyQuery();

  const onSubmitEditing = (): void => {
    if (loading) return;
    const { keyword } = getValues();
    startQueryFn({ variables: { keyword: keyword } });
  };

  const SearchBox = () => (
    <Controller
      name="keyword"
      control={control}
      rules={{ required: true, minLength: 1, maxLength: 20 }}
      render={({ field: { onChange, value } }) => (
        <Input
          width={width}
          placeholderTextColor="gray"
          value={value}
          onChangeText={onChange}
          placeholder="Search photos"
          autoCapitalize="none"
          returnKeyLabel="Search"
          returnKeyType="search"
          autoCorrect={false}
          onSubmitEditing={onSubmitEditing}
        />
      )}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
  }, []);

  const renderItem = ({ item: photo }: any) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Photo", { photoId: photo.id })}
    >
      <Image
        source={{ uri: photo.file }}
        style={{ width: width / numColumns, height: 100 }}
      />
    </TouchableOpacity>
  );

  return (
    <DismissKeyboard>
      <Container>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size="large" />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>Search by keyword</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchPhotos !== undefined ? (
          data?.searchPhotos?.length === 0 ? (
            <MessageContainer>
              <MessageText>Could not find anything.</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              data={data.searchPhotos}
              keyExtractor={(photo) => "" + photo?.id}
              renderItem={renderItem}
              numColumns={numColumns}
            />
          )
        ) : null}
      </Container>
    </DismissKeyboard>
  );
}
