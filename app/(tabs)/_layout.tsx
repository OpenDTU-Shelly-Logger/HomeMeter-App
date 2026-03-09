import { Tabs } from "expo-router";
import React from "react";
import { View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { HapticTab } from "@/components/hapticTab";
import { useTheme } from "@/hooks/useTheme";

export default function TabLayout() {
  const colors = useTheme();

  const makeTabIcon = (
    focused: boolean,
    icon: React.ComponentProps<typeof Ionicons>["name"],
    focusedIcon: React.ComponentProps<typeof Ionicons>["name"],
  ) => {
    return (
      <Ionicons
        name={`${focused ? focusedIcon : icon}`}
        size={26}
        color={focused ? colors.accent : colors.text}
      />
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Tabs
        screenOptions={{
          animation: "fade",
          tabBarStyle: {
            backgroundColor: colors.background,
            elevation: 0,
            marginTop: -8,
            borderTopWidth: 0,
            overflow: "hidden",
          },
          tabBarButton: HapticTab,
          headerShown: false,
          tabBarLabelStyle: {
            display: "none",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "",
            tabBarIcon: ({ focused }) =>
              makeTabIcon(focused, "home-outline", "home"),
          }}
        />
        <Tabs.Screen
          name="solarOverview"
          options={{
            title: "",
            tabBarIcon: ({ focused }) =>
              makeTabIcon(focused, "sunny-outline", "sunny"),
          }}
        />
        <Tabs.Screen
          name="solarTable"
          options={{
            title: "",
            tabBarIcon: ({ focused }) =>
              makeTabIcon(focused, "list-outline", "list"),
          }}
        />
        <Tabs.Screen
          name="powerUsage"
          options={{
            title: "",
            tabBarIcon: ({ focused }) =>
              makeTabIcon(focused, "power-outline", "power"),
          }}
        />
        <Tabs.Screen
          name="charts"
          options={{
            title: "",
            tabBarIcon: ({ focused }) =>
              makeTabIcon(focused, "bar-chart-outline", "bar-chart"),
          }}
        />
      </Tabs>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
