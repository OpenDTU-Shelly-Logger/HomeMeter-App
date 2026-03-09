import React from "react";
import { View } from "react-native";
import SimpleBox from "./simpleBox";
import SimpleText from "./simpleText";
import { useTheme } from "@/hooks/useTheme";

type Props = {
  data: { key: string; value: string }[];
  headline?: string;
};

export default function SimpleKeyValueBox(props: Props) {
  const colors = useTheme();

  return (
    <SimpleBox style={{ width: "100%" }}>
      {props.headline && (
        <SimpleText fontsize={18} style={{ color: "gray", marginBottom: 10 }}>
          {props.headline}
        </SimpleText>
      )}
      {props.data.map((item, index) => (
        <View
          key={index}
          style={{
            borderRadius: 10,
            paddingLeft: 5,
            paddingRight: 5,
            paddingVertical: 2,
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: index % 2 == 0 ? colors.accent2 : colors.boxBG,
          }}
        >
          <SimpleText fontsize={16}>{item.key}</SimpleText>
          <SimpleText fontsize={18} style={{ fontWeight: "bold" }}>
            {item.value}
          </SimpleText>
        </View>
      ))}
    </SimpleBox>
  );
}
