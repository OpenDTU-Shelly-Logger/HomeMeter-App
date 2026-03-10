import React from "react";
import { View, Text } from "react-native";
import SimpleText from "./simpleText";
import { useTheme } from "@/hooks/useTheme";

type Props = {
  text: string;
  alignText?: "left" | "right" | "justify" | "center";
};

export default function SectionHeadline({ text, alignText }: Props) {
  const colors = useTheme();

  return (
    <SimpleText
      fontsize={20}
      style={{
        color: colors.secondaryText,
        fontWeight: "bold",
        textAlign: alignText ?? "center",
        width: "100%",
        marginTop: 20,
        marginBottom: 5,
      }}
    >
      {text}
    </SimpleText>
  );
}
