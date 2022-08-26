import { useReactiveVar } from "@apollo/client";
import { ActivityIndicator, View } from "react-native";
import { isDarkModeVar } from "../apollo";

interface ScreenLayoutProps {
  loading: boolean;
  children: JSX.Element;
}

export default function ScreenLayout({ loading, children }: ScreenLayoutProps) {
  const isDarkMode: "light" | "dark" = useReactiveVar(isDarkModeVar);
  return (
    <>
      {isDarkMode === "light" ? (
        <View
          style={{
            backgroundColor: "white",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loading ? <ActivityIndicator color="black" /> : children}
        </View>
      ) : (
        <View
          style={{
            backgroundColor: "black",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loading ? <ActivityIndicator color="white" /> : children}
        </View>
      )}
    </>
  );
}
