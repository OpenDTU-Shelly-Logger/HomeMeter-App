import { Stack } from "expo-router";
import { useColorScheme, View } from "react-native";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import * as StatusBar from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import React, { useEffect } from "react";
import { DataProvider } from "@/contexts/dataProvider";
import { SettingsProvider } from "@/contexts/settingsContext";
import Themes from "@/assets/colors/colors";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const background =
    colorScheme === "light"
      ? Themes["light"].background
      : Themes["dark"].background;

  const navTheme =
    colorScheme === "light"
      ? { ...DefaultTheme, colors: { ...DefaultTheme.colors, background } }
      : { ...DarkTheme, colors: { ...DarkTheme.colors, background } };

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(background);
    StatusBar.setStatusBarBackgroundColor(background);
  }, [colorScheme]);

  return (
    <ThemeProvider value={navTheme}>
      <SettingsProvider>
        <DataProvider>
          <View style={{ flex: 1, backgroundColor: background }}>
            <Stack
              screenOptions={{
                gestureEnabled: true,
                headerShown: false,
                animation: "ios_from_right",
                freezeOnBlur: true,
                contentStyle: { backgroundColor: background },
              }}
            >
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="settings" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </View>
        </DataProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
}
