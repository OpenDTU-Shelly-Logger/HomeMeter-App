import React, { ReactNode, useState } from "react";
import Modal from "react-native-modal";
import { ScrollView, StyleSheet, useColorScheme, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";

type Props = {
  children: ReactNode;
  isVisible?: boolean;
  dismissed?: () => void;
};

export default function SimpleModalBottomFlyout({
  children,
  isVisible,
  dismissed,
}: Props) {
  const colors = useTheme();

  const backPressed = () => {
    if (dismissed) dismissed();
  };

  return (
    <Modal
      statusBarTranslucent={true}
      onBackdropPress={() => backPressed()}
      isVisible={isVisible}
      style={styles.modal}
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      backdropTransitionOutTiming={1}
      hideModalContentWhileAnimating
    >
      <View
        style={[styles.contentWrapper, { backgroundColor: colors.background }]}
      >
        <ScrollView
          scrollEnabled={true}
          contentContainerStyle={styles.scrollContainer}
          style={styles.scrollView}
        >
          {children}
        </ScrollView>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
    backgroundColor: "transparent",
  },
  contentWrapper: {
    maxHeight: "70%",
    minHeight: "25%",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden", // Ensures no overflow glitches
  },
  scrollView: {
    flexGrow: 0, // Important: prevent ScrollView from expanding unnecessarily
  },
  scrollContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
