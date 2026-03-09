import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import SimplePage from "@/components/simplePage";
import SimpleText from "@/components/simpleText";
import { useSettings } from "@/contexts/settingsContext";
import { useTheme } from "@/hooks/useTheme";

export default function SettingsScreen() {
  const colors = useTheme();
  const { baseUrl, setBaseUrl } = useSettings();
  const [urlInput, setUrlInput] = useState(baseUrl);

  useEffect(() => {
    setUrlInput(baseUrl);
  }, [baseUrl]);

  const handleSave = () => {
    setBaseUrl(urlInput);
    Keyboard.dismiss();
  };

  const handleReset = () => {
    const defaultUrl = "https://example.com";
    setUrlInput(defaultUrl);
    setBaseUrl(defaultUrl);
    Keyboard.dismiss();
  };

  return (
    <SimplePage showBackButton headline="Settings" showSettingsIcon={false}>
      <View style={styles.section}>
        <SimpleText style={styles.label}>Server URL</SimpleText>
        <SimpleText style={styles.description}>
          Enter the base URL for the solar data server.
        </SimpleText>

        <TextInput
          style={[
            styles.input,
            {
              color: colors.text,
              borderColor: colors.background,
              backgroundColor: colors.containerBG,
            },
          ]}
          value={urlInput}
          onChangeText={setUrlInput}
          placeholder="https://example.com"
          placeholderTextColor={colors.text}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
          onBlur={handleSave}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.accent }]}
          onPress={handleSave}
        >
          <SimpleText style={styles.buttonText}>Save</SimpleText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: colors.containerBG, marginTop: 10 },
          ]}
          onPress={handleReset}
        >
          <SimpleText style={styles.buttonText}>Reset to Default</SimpleText>
        </TouchableOpacity>
      </View>
    </SimplePage>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 15,
    opacity: 0.7,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
