import { loadPowerData, PowerData } from "@/backend/powerDataParser";
import {
  DailySolarData,
  getAllSolarItems,
  loadAllData,
  loadData,
  SolarData,
} from "@/backend/solarDataParser";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

import { useSettings } from "@/contexts/settingsContext";

interface DataContextType {
  liveSolarData: SolarData | null;
  solarHistoryData: DailySolarData[];
  livePowerData: PowerData | null;
  reloadData: () => Promise<void>;
}

const DataProviderContext = createContext<DataContextType | undefined>(
  undefined,
);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { baseUrl, isLoading } = useSettings();
  const [liveSolarData, setLiveSolarData] = useState<SolarData | null>(null);
  const [solarHistoryData, setSolarHistoryData] = useState<DailySolarData[]>(
    [],
  );
  const [livePowerData, setLivePowerData] = useState<PowerData | null>(null);

  const fetchData = async () => {
    if (!baseUrl) return;
    try {
      const allData = await loadAllData(baseUrl);
      let res = getAllSolarItems(allData);
      const items = res.items;
      setSolarHistoryData(items);

      const liveData = await loadData(baseUrl);
      setLiveSolarData(liveData);

      const powerData = await loadPowerData(baseUrl);
      setLivePowerData(powerData);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isLoading || !baseUrl) return;

    const socket = io(baseUrl, {
      path: "/dataSocket",
      transports: ["websocket"],
    });

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    socket.on("liveData", (data) => {
      setLiveSolarData(data);
    });

    socket.on("historyData", (data) => {
      let res = getAllSolarItems(data);
      const items = res.items;
      if (items.length > 0) {
        setSolarHistoryData(items);
      }
    });

    socket.on("powerData", (data) => {
      setLivePowerData(JSON.parse(data));
    });

    fetchData();

    return () => {
      socket.disconnect();
    };
  }, [baseUrl, isLoading]);

  return (
    <DataProviderContext.Provider
      value={{
        liveSolarData: liveSolarData,
        solarHistoryData: solarHistoryData,
        livePowerData: livePowerData,
        reloadData: fetchData,
      }}
    >
      {children}
    </DataProviderContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataProviderContext);
  if (!context) {
    throw new Error("context must be used within a DataProvider");
  }
  return context;
};
