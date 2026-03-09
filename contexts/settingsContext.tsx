import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SettingsContextType {
  baseUrl: string;
  setBaseUrl: (url: string) => Promise<void>;
  isLoading: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [baseUrl, setBaseUrlState] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const storedUrl = await AsyncStorage.getItem("baseUrl");
      if (storedUrl) {
        setBaseUrlState(storedUrl);
      }
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

  return (
    <SettingsContext.Provider value={{ baseUrl, setBaseUrl, isLoading }}>
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
