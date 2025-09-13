const API_MARKET = "http://localhost:3001/api/market";
const API_FORECAST = "http://localhost:3001/api/forecast";

const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export async function loadCryptoHistory(symbol: string, forceRefresh = false) {
  const res = await fetch(
    `${API_MARKET}/crypto/${encodeURIComponent(symbol)}/history?forceRefresh=${forceRefresh}`,
    { headers: getAuthHeaders() }
  );
  if (!res.ok) throw new Error("Failed to load market history");
  return res.json() as Promise<{
    symbol: string;
    source: string;
    rows: { date: string; close: number }[];
  }>;
}

export async function getCryptoForecast(
  symbol: string,
  years = 1,
  method: "historical" | "gbm" = "historical",
  simulations = 10000
) {
  const res = await fetch(
    `${API_FORECAST}/crypto/${encodeURIComponent(symbol)}?years=${years}&method=${method}&simulations=${simulations}`,
    { headers: getAuthHeaders() }
  );
  if (!res.ok) throw new Error("Failed to load forecast");
  return res.json() as Promise<{
    symbol: string;
    years: number;
    expectedTotalPercent: number;
    expectedAnnualPercent: number;
    p10: number | null;
    p50: number | null;
    p90: number | null;
    method: string;
    samples: number;
    warning?: string;
  }>;
}
