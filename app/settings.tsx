import React, { useState, useEffect } from "react";
import Constants from "expo-constants";
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
import { useTranslations } from "@/locales";

export default function SettingsScreen() {
  const colors = useTheme();
  const { baseUrl, setBaseUrl, language, setLanguage } = useSettings();
  const t = useTranslations();

  const [urlInput, setUrlInput] = useState(baseUrl);

  useEffect(() => {
    setUrlInput(baseUrl);
  }, [baseUrl]);

  const handleSave = () => {
    setBaseUrl(urlInput);
    Keyboard.dismiss();
  };

  const handleReset = () => {
    const defaultBaseUrl = "https://example.com";

    setUrlInput(defaultBaseUrl);
    setBaseUrl(defaultBaseUrl);

    Keyboard.dismiss();
  };

  return (
    <SimplePage showBackButton headline={t.settings} showSettingsIcon={false}>
      <View style={styles.section}>
        {/* Base URL */}
        <SimpleText style={styles.label}>{t.serverUrl}</SimpleText>
        <SimpleText style={styles.description}>{t.enterBaseUrl}</SimpleText>

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
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.accent }]}
          onPress={handleSave}
        >
          <SimpleText style={styles.buttonText}>{t.save}</SimpleText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: colors.containerBG, marginTop: 10 },
          ]}
          onPress={handleReset}
        >
          <SimpleText style={styles.buttonText}>{t.resetToDefault}</SimpleText>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        {/* Language */}
        <SimpleText style={styles.label}>{t.language}</SimpleText>
        <View style={styles.segmentedControl}>
          {(["en", "de"] as const).map((lang) => (
            <TouchableOpacity
              key={lang}
              style={[
                styles.segment,
                {
                  backgroundColor:
                    language === lang ? colors.accent : colors.containerBG,
                },
              ]}
              onPress={() => setLanguage(lang)}
            >
              <SimpleText
                style={[
                  styles.segmentText,
                  {
                    color: language === lang ? colors.background : colors.text,
                  },
                ]}
              >
                {lang === "en" ? "English" : "Deutsch"}
              </SimpleText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SimpleText style={styles.label}>{t.about}</SimpleText>
        <SimpleText style={styles.description}>
          {Constants.expoConfig?.name} v{Constants.expoConfig?.version}
          {"\n"}
          Author: Julius Kirsch
        </SimpleText>
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
  segmentedControl: {
    flexDirection: "row",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
  },
  segment: {
    flex: 1,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  segmentText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
