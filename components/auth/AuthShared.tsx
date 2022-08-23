import { TextInput } from "react-native";
import styled from "styled-components/native";

export const AuthTextInput = styled(TextInput)<{ lastOne?: boolean }>`
  background-color: ${(props) => props.theme.inputBgColor};
  padding: 15px 7px;
  border-radius: 4px;
  color: ${(props) => props.theme.textColor};
  margin-bottom: ${(props) => (props.lastOne ? "15" : 8)}px;
`;
