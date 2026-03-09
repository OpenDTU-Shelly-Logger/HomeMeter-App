import { useTheme } from "@/hooks/useTheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { View, Text, LayoutChangeEvent } from "react-native";
import SimpleText from "./simpleText";

type Props = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  iconSize?: number;
  title?: string;
  onLayout?: (event: LayoutChangeEvent) => void;
  color?: string;
  marginLeft?: number;
  marginRight?: number;
};

export default function HomePageOverviewComponent(props: Props) {
  const colors = useTheme();

  return (
    <View
      onLayout={(e) => props.onLayout?.(e)}
      style={{
        marginLeft: props.marginLeft,
        marginRight: props.marginRight,
        padding: 5,
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 10,
        width: 120,
      }}
    >
      <Ionicons
        style={{ textAlign: "center" }}
        name={props.icon}
        size={props.iconSize ?? 32}
        color={props.color ?? colors.text}
      />
      <SimpleText style={{ textAlign: "center" }} fontsize={22}>
        {props.title}
      </SimpleText>
    </View>
  );
}
