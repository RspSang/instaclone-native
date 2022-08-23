import { useReactiveVar } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { isDarkModeVar } from "../apollo";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.bgColor};
`;

const Logo = styled.Image`
  max-width: 50%;
  height: 100px;
`;

const CreateAccount = styled.View`
  background-color: ${(props) => props.theme.activeColor};
  padding: 7px 10px;
  border-radius: 3px;
`;
const CreateAccountText = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
`;

const LoginLink = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-top: 10px;
`;

type RootStackParamList = {
  Enter: undefined;
  LogIn: undefined;
  CreateAccount: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Enter">;

export default function Welcome({ navigation }: Props) {
  const isDarkMode: "light" | "dark" = useReactiveVar(isDarkModeVar);
  console.log(isDarkMode);
  const goToCreateAccount = () => navigation.navigate("CreateAccount");
  const goToLogIn = () => navigation.navigate("LogIn");
  return (
    <Container>
      {isDarkMode === "dark" ? (
        <Logo
          resizeMode="contain"
          source={require("../assets/instagram_logo_dark.png")}
        />
      ) : (
        <Logo
          resizeMode="contain"
          source={require("../assets/instagram_logo_light.png")}
        />
      )}
      <TouchableOpacity onPress={goToCreateAccount}>
        <CreateAccount>
          <CreateAccountText>Create Account</CreateAccountText>
        </CreateAccount>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToLogIn}>
        <LoginLink>Log in</LoginLink>
      </TouchableOpacity>
    </Container>
  );
}
