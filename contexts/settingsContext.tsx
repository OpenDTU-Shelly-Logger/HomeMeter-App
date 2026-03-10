import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Language = "en" | "de";

interface SettingsContextType {
  baseUrl: string;
  setBaseUrl: (url: string) => Promise<void>;
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  isLoading: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [baseUrl, setBaseUrlState] = useState<string>("");
  const [language, setLanguageState] = useState<Language>("en");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const [storedUrl, storedLang] = await Promise.all([
        AsyncStorage.getItem("baseUrl"),
        AsyncStorage.getItem("language"),
      ]);
      if (storedUrl) setBaseUrlState(storedUrl);
      if (storedLang === "en" || storedLang === "de")
        setLanguageState(storedLang);
    } catch (e) {
      console.error("Failed to load settings", e);
    } finally {
      setIsLoading(false);
    }
  };

  const setBaseUrl = async (url: string) => {
    try {
      // Remove trailing slash if present
      const cleanUrl = url.replace(/\/$/, "");
      await AsyncStorage.setItem("baseUrl", cleanUrl);
      setBaseUrlState(cleanUrl);
    } catch (e) {
      console.error("Failed to save settings", e);
    }
  };

  const setLanguage = async (lang: Language) => {
    try {
      await AsyncStorage.setItem("language", lang);
      setLanguageState(lang);
    } catch (e) {
      console.error("Failed to save language", e);
    }
  };

  return (
    <SettingsContext.Provider
      value={{ baseUrl, setBaseUrl, language, setLanguage, isLoading }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
