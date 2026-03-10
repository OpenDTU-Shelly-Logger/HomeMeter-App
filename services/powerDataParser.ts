import { PowerData } from "@/types/Emeter";

async function loadPowerData(baseUrl: string): Promise<PowerData | null> {
  const jsonData = await fetch(`${baseUrl}/api/data/power`).then((res) =>
    res.json(),
  );
  return jsonData;
}

export { loadPowerData };
