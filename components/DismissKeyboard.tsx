import { Keyboard, Platform, TouchableWithoutFeedback } from "react-native";

interface DismissKeyboardProps {
  children: JSX.Element;
}

export default function DismissKeyboard({ children }:DismissKeyboardProps) {
    const dismissKeyboard = () => {
      Keyboard.dismiss();
    };
    return (
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={dismissKeyboard}
        disabled={Platform.OS === "web"}
      >
        {children}
      </TouchableWithoutFeedback>
    );
  }