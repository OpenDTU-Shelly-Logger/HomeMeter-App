interface Emeter {
  power: number;
  pf: number;
  current: number;
  voltage: number;
  is_valid: boolean;
  total: number;
  total_returned: number;
}

interface PowerData {
  total_power: number;
  emeters: Emeter[];
}

async function loadPowerData(baseUrl: string): Promise<PowerData | null> {
  try {
    const jsonData = await fetch(`${baseUrl}/data/livepower.json`).then((res) =>
      res.json(),
    );
    return jsonData as PowerData;
  } catch {
    return null;
  }
}

export { loadPowerData };

export type { PowerData, Emeter };
