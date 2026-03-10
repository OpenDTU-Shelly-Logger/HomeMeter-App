import { SolarData } from "@/types/OpenDTUData";

export async function loadLiveSolarData(baseUrl: string): Promise<SolarData> {
  const url = `${baseUrl}/api/data/solar`;

  const response = await fetch(url);

  const data = await response.json();
  return data as SolarData;
}
