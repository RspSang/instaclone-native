import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const Button = styled.TouchableOpacity<{ disabled: boolean }>`
  background-color: ${(props) => props.theme.activeColor};
  padding: 15px 10px;
  border-radius: 3px;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  text-align: center;
`;

interface AuthButtonProps {
  onPress: () => void;
  text: string;
  disabled: boolean;
  loading?: boolean;
}

export default function AuthButton({
  onPress,
  disabled,
  text,
  loading = false,
}: AuthButtonProps) {
  return (
    <Button disabled={disabled} onPress={onPress}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <ButtonText>{text}</ButtonText>
      )}
    </Button>
  );
}
