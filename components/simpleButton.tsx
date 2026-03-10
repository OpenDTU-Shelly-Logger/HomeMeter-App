import { useTheme } from "@/hooks/useTheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

type ButtonProps = {
  title?: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  highlighted?: boolean;
};

const SimpleButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  style = {},
  textStyle = {},
  highlighted = false,
}) => {
  const colors = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        style,
        {
          backgroundColor: highlighted
            ? colors.highlightedBG
            : colors.containerBG,
        },
      ]}
      onPress={onPress}
    >
      {title && (
        <Text
          style={[
            styles.buttonText,
            textStyle,
            { color: highlighted ? colors.highlightedText : colors.text },
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
  },
});

export default SimpleButton;
