"use client";

import {
  getAllHistoryItems,
  loadHistoryData,
} from "@/services/historyDataReader";
import { loadLiveSolarData } from "@/services/liveSolarDataReader";
import { loadPowerData } from "@/services/powerDataParser";
import { PowerData } from "@/types/Emeter";
import { SolarData } from "@/types/OpenDTUData";
import { DailySolarData } from "@/types/SolarHistory";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { io } from "socket.io-client";
import { useSettings } from "./settingsContext";
import { Platform } from "react-native";

interface DataContextType {
  historyData: DailySolarData[];
  liveSolarData: SolarData | null;
  livePowerData: PowerData | null;
  reloadData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const { baseUrl, isLoading } = useSettings();
  const [historyData, setHistoryData] = useState<DailySolarData[]>([]);
  const [liveSolarData, setLiveData] = useState<SolarData | null>(null);
  const [livePowerData, setPowerData] = useState<PowerData | null>(null);

  const fetchData = async () => {
    if (!baseUrl) return;

    await loadHistoryData(baseUrl).then((data) => {
      setHistoryData(data.items);
    });

    await loadLiveSolarData(baseUrl).then((data) => {
      setLiveData(data);
    });

    await loadPowerData(baseUrl).then((data) => setPowerData(data));
  };

  useEffect(() => {
    if (isLoading || !baseUrl) return;

    const socket = io(baseUrl, {
      path: "/api/socket",
      transports: ["websocket"],
    });

    socket.on("connection", (socket: any) => {
      console.log("Client connected:", socket.id);

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });

    // 1. Listen for Live OpenDTU data
    socket.on("liveSolar", (data) => setLiveData(data));

    // 2. Listen for History updates
    socket.on("historyData", (data) => {
      let items: DailySolarData[];
      if (typeof data === "string" && data.includes("|")) {
        items = getAllHistoryItems(data).items;
      } else {
        items = typeof data === "string" ? JSON.parse(data).items : data.items;
      }

      if (items !== undefined) setHistoryData(items);
    });

    // 3. Listen for Shelly/Power data
    socket.on("livePower", (data) => {
      setPowerData(typeof data === "string" ? JSON.parse(data) : data);
    });

    fetchData();

    return () => {
      socket.disconnect();
    };
  }, [baseUrl, isLoading]);

  return (
    <DataContext.Provider
      value={{
        historyData,
        liveSolarData: liveSolarData,
        livePowerData: livePowerData,
        reloadData: fetchData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within DataProvider");
  return context;
};
