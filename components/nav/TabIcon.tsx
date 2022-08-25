import { Ionicons } from "@expo/vector-icons";

interface TabIconProps {
  iconName: "home" | "search" | "heart" | "camera" | "person";
  color: string;
  focused: boolean;
}

export default function TabIcon({ iconName, color, focused }: TabIconProps) {
  return (
    <Ionicons
      name={focused ? iconName : `${iconName}-outline`}
      color={color}
      size={22}
    />
  );
}
