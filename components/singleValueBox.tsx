import React from "react";
import { StyleSheet, TextStyle } from "react-native";
import SimpleBox from "./simpleBox";
import SimpleText from "./simpleText";
import { useTheme } from "@/hooks/useTheme";

interface SingleValueBoxProps {
  headline?: string;
  value?: string;
  selectable?: boolean;
  fontStyle?: TextStyle;
  accent?: boolean;
  boxColor?: string;
  height?: number;
}

const SingleValueBox: React.FC<SingleValueBoxProps> = ({
  boxColor,
  accent,
  fontStyle,
  value,
  headline,
  selectable,
  height = 40,
}) => {
  const colors = useTheme();
  return (
    <SimpleBox
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: boxColor ?? "transparent",
        height: height,
        padding: 0,
      }}
    >
      <SimpleText
        style={{
          color: accent ? colors.text : colors.accent,
          fontWeight: "bold",
        }}
        fontsize={18}
      >
        {headline}
      </SimpleText>
      <SimpleText
        fontsize={22}
        selectable={selectable}
        style={[
          {
            fontWeight: "900",
          },
          fontStyle,
        ]}
      >
        {value}
      </SimpleText>
    </SimpleBox>
  );
};

export default SingleValueBox;
