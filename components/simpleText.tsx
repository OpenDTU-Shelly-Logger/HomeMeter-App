import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { Text, StyleSheet, TextStyle, StyleProp } from "react-native";

interface SimpleTextProps {
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode | undefined;
  fontsize?: number;
  selectable?: boolean;
}

const SimpleText: React.FC<SimpleTextProps> = ({
  style,
  children,
  fontsize,
  selectable,
}) => {
  const colors = useTheme();

  return (
    <Text
      selectable={selectable}
      children={children}
      style={[styles.text, { color: colors.text, fontSize: fontsize }, style]}
    />
  );
};

const styles = StyleSheet.create({
  text: {},
});

export default SimpleText;
