import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { View, ViewStyle } from "react-native";

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export default function SimpleBox({ children, style }: Props) {
  const colors = useTheme();

  return (
    <View
      style={[
        { backgroundColor: colors.boxBG, padding: 10, borderRadius: 20 },
        style,
      ]}
    >
      {children}
    </View>
  );
}
