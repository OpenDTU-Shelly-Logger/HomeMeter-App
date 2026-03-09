import React, { useState } from "react";
import { View, StyleSheet, Text, LayoutChangeEvent } from "react-native";
import Svg, { Line, Path, Polygon } from "react-native-svg";
import HomePageOverviewComponent from "./homePageOverviewComponent";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@/hooks/useTheme";

interface HomePageDataOverviewProps {
  leftTitle: string;
  leftIcon: React.ComponentProps<typeof Ionicons>["name"];
  rightTitle: string;
  rightIcon: React.ComponentProps<typeof Ionicons>["name"];
  bottomTitle: string;
  bottomIcon: React.ComponentProps<typeof Ionicons>["name"];
  lineText: string;
  useSolarPower: Boolean;
  useGridPower: Boolean;
}

export default function HomePageDataOverview({
  leftTitle,
  leftIcon,
  rightTitle,
  rightIcon,
  bottomTitle,
  bottomIcon,
  lineText,
  useGridPower,
  useSolarPower,
}: HomePageDataOverviewProps) {
  const colors = useTheme();

  const [leftPos, setLeftPos] = useState({ x: 0, y: 0 });
  const [rightPos, setRightPos] = useState({ x: 0, y: 0 });
  const [bottomPos, setBottomPos] = useState({ x: 0, y: 0 });
  const onLayoutLeft = (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setLeftPos({ x: x + width / 2, y: y + height });
  };

  const onLayoutRight = (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setRightPos({ x: x + width / 2, y: y + height });
  };

  const onLayoutBottom = (event: LayoutChangeEvent) => {
    const { x, y, width } = event.nativeEvent.layout;
    setBottomPos({ x: x + width / 2, y: y });
  };
  const arrowX = leftPos.x + (rightPos.x - leftPos.x) / 2 + 60;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <HomePageOverviewComponent
          icon={leftIcon}
          title={leftTitle}
          onLayout={(e: LayoutChangeEvent) => onLayoutLeft(e)}
          color="yellow"
        />
        <HomePageOverviewComponent
          icon={rightIcon}
          title={rightTitle}
          onLayout={(e: LayoutChangeEvent) => onLayoutRight(e)}
          color="red"
        />
      </View>

      <HomePageOverviewComponent
        icon={bottomIcon}
        title={bottomTitle}
        onLayout={(e: LayoutChangeEvent) => onLayoutBottom(e)}
        color="#9cc4ff"
      />

      <Svg style={StyleSheet.absoluteFill}>
        {/* Line from Left */}
        <Path
          d={`M${leftPos.x} ${leftPos.y + 25} v60 a10 10 0 0 0 10 10 h${bottomPos.x - (leftPos.x + 75)}`}
          strokeWidth="2"
          fill="none"
          stroke={useSolarPower ? colors.text : colors.accent2}
          strokeDasharray={useSolarPower ? "" : "5,5"}
        />

        {/* Line from Right */}
        <Path
          d={`M${rightPos.x} ${rightPos.y + 25} v60 a10 10 0 0 1 -10 10 h${bottomPos.x - (rightPos.x - 75)}`}
          stroke={useGridPower ? colors.text : colors.accent2}
          strokeDasharray={useGridPower ? "" : "5,5"}
          strokeWidth="2"
          fill="none"
        />

        {/* Line from Top Left to Top Right */}
        {!useGridPower && (
          <Path
            d={`M${leftPos.x + 80} ${leftPos.y} H${rightPos.x - 70}`}
            stroke={colors.text}
            strokeWidth="2"
            fill="none"
          />
        )}
        {/* Arrow at the center of the horizontal line */}
        {!useGridPower && (
          <Polygon
            points={`${arrowX},${leftPos.y + 10} ${arrowX + 10},${leftPos.y} ${arrowX},${leftPos.y - 10}`}
            fill={colors.text}
          />
        )}
      </Svg>

      {/* Text Above the Top Line */}
      {!useGridPower && (
        <View
          style={{
            position: "absolute",
            top: leftPos.y - 30,
            left: leftPos.x + (rightPos.x - leftPos.x) / 2 - 30,
          }}
        >
          <Text style={{ color: colors.text, fontSize: 16 }}>{lineText}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  row: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 50,
  },
});
