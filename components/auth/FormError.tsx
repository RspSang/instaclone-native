import { View } from "react-native";
import styled from "styled-components/native";

const SFormError = styled.Text`
  color: tomato;
  font-weight: 600;
  font-size: 12px;
  margin: 5px 0px 10px 0px;
`;

interface FormErrorProps {
  message?: string;
}

function FormError({ message }: FormErrorProps) {
  return message === "" || !message ? null : (
    <View>
      <SFormError>{message}</SFormError>
    </View>
  );
}

export default FormError;
