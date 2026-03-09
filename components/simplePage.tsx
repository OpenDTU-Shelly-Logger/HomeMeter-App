import React, { useEffect } from "react";
import {
  StyleSheet,
  ViewStyle,
  ScrollView,
  View,
  RefreshControl,
} from "react-native";
import * as StatusBar from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import SimplePageHeadline from "./simplePageHeadline";
import SimpleIconButton from "./simpleIconButton";
import { useData } from "@/contexts/dataProvider";
import { router } from "expo-router";
import { useTheme } from "@/hooks/useTheme";

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
  enableScroll?: boolean;
  fullscreen?: boolean;
  headline?: string;
  showSettingsIcon?: boolean;
  showBackButton?: boolean;
};

export default function SimplePage({
  children,
  style,
  enableScroll,
  fullscreen,
  headline,
  showSettingsIcon = true,
  showBackButton = false,
}: Props) {
  const colors = useTheme();
  const data = useData();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    data.reloadData();

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const showSettings = () => {
    router.push("/settings");
  };

  const backArrowButton = () => {
    router.back();
  };

  const content = () => {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: colors.background },
          { padding: fullscreen ? 0 : 8 },
          style,
        ]}
      >
        <View
          style={[
            styles.header,
            {
              padding: fullscreen ? 0 : 10,
              paddingBottom: fullscreen ? 0 : 20,
            },
          ]}
        >
          {headline && <SimplePageHeadline text={headline} />}
          <View style={styles.closeButtonHeader}>
            {showSettingsIcon && (
              <SimpleIconButton
                iconSize={28}
                icon="settings-outline"
                onPress={showSettings}
              />
            )}
            {showBackButton && (
              <SimpleIconButton
                iconSize={28}
                icon="close"
                onPress={backArrowButton}
              />
            )}
          </View>
        </View>

        {enableScroll ? (
          <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            scrollEnabled={true}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {children}
          </ScrollView>
        ) : (
          children
        )}
      </View>
    );
  };

  useEffect(() => {
    if (fullscreen) StatusBar.setStatusBarBackgroundColor("transparent");
  }, [fullscreen]);
  return fullscreen ? (
    content()
  ) : (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {content()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 3,
    marginRight: 3,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  closeButtonHeader: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row",
  },
});
