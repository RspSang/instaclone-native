import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { RootStackParamList } from "../shared/shared.types";

const LoginLink = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-top: 20px;
  text-align: center;
`;

type WelcomeProps = NativeStackScreenProps<RootStackParamList, "Enter">;

export default function Welcome({ navigation }: WelcomeProps) {
  const goToCreateAccount = () => navigation.navigate("CreateAccount");
  const goToLogIn = () => navigation.navigate("LogIn");
  return (
    <AuthLayout>
      <AuthButton
        text="Crate New Account"
        disabled={false}
        onPress={goToCreateAccount}
      />
      <TouchableOpacity onPress={goToLogIn}>
        <LoginLink>Log in</LoginLink>
      </TouchableOpacity>
    </AuthLayout>
  );
}
