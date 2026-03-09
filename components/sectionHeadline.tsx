import React from "react";
import { View, Text } from "react-native";
import SimpleText from "./simpleText";
import { useTheme } from "@/hooks/useTheme";

type Props = {
  text: string;
};

export default function SectionHeadline({ text }: Props) {
  const colors = useTheme();

  return (
    <SimpleText
      fontsize={20}
      style={{
        color: colors.secondaryText,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
        marginBottom: 5,
      }}
    >
      {text}
    </SimpleText>
  );
}
