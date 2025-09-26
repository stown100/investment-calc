import { Router } from "express";
import { openDb, dailyPricesCollection } from "./db";
import https from "https";

const router = Router();
// Minimal HTTP helpers (avoid relying on global fetch)
function httpGetText(
  url: string,
  accept: string = "application/json"
): Promise<string> {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        headers: {
          "User-Agent": "investment-calc/1.0",
          Accept: accept,
        },
        timeout: 15000,
      },
      (res) => {
        const { statusCode, headers } = res;
        if (
          statusCode &&
          statusCode >= 300 &&
          statusCode < 400 &&
          headers.location
        ) {
          // follow one redirect
          res.resume();
          httpGetText(headers.location, accept).then(resolve).catch(reject);
          return;
        }
        if (!statusCode || statusCode < 200 || statusCode >= 300) {
          res.resume();
          reject(new Error(`HTTP ${statusCode || "ERR"}`));
          return;
        }
        const chunks: Buffer[] = [];
        res.on("data", (c) =>
          chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c))
        );
        res.on("end", () => {
          resolve(Buffer.concat(chunks).toString("utf8"));
        });
      }
    );
    req.on("error", reject);
    req.on("timeout", () => {
      req.destroy(new Error("Request timeout"));
    });
  });
}

async function httpGetJson(url: string): Promise<any> {
  const text = await httpGetText(url, "application/json");
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error("Invalid JSON response");
  }
}

// Simple mapper for CoinGecko ids by common symbols (crypto only)
const COINGECKO_IDS: Record<string, string> = {
  BTC: "bitcoin",
  BITCOIN: "bitcoin",
  TON: "the-open-network",
};

async function fetchCoinGeckoHistory(
  id: string
): Promise<Array<{ date: string; close: number }>> {
  const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=max`;
  const data = await httpGetJson(url);
  const prices: Array<[number, number]> = data.prices || [];
  return prices.map(([ts, price]) => ({
    date: new Date(ts).toISOString().slice(0, 10),
    close: price,
  }));
}

// Binance klines fallback for crypto (USDT pairs)
async function fetchBinanceKlines(
  symbol: string
): Promise<Array<{ date: string; close: number }>> {
  const pair = symbol.toUpperCase() + "USDT";
  const url = `https://api.binance.com/api/v3/klines?symbol=${pair}&interval=1d&limit=1000`;
  const data: any[] = await httpGetJson(url);
  return data.map((row) => ({
    date: new Date(row[0]).toISOString().slice(0, 10),
    close: parseFloat(row[4]),
  }));
}

// Stooq CSV for equities/ETFs (e.g., SPY)
async function fetchStooqDaily(
  symbol: string
): Promise<Array<{ date: string; close: number }>> {
  const s = symbol.toLowerCase() + ".us";
  const url = `https://stooq.com/q/d/l/?s=${encodeURIComponent(s)}&i=d`;
  const text = await httpGetText(url, "text/csv");
  const lines = text.trim().split(/\r?\n/);
  // CSV header: Date,Open,High,Low,Close,Volume
  const rows: Array<{ date: string; close: number }> = [];
  for (let i = 1; i < lines.length; i++) {
    const [date, , , , close] = lines[i].split(",");
    const c = parseFloat(close);
    if (!isNaN(c)) rows.push({ date, close: c });
  }
  if (rows.length === 0) throw new Error("No data from Stooq");
  rows.sort((a, b) => a.date.localeCompare(b.date));
  return rows;
}

async function fetchCryptoCompareDaily(
  symbol: string
): Promise<Array<{ date: string; close: number }>> {
  const url = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${encodeURIComponent(
    symbol.toUpperCase()
  )}&tsym=USD&limit=2000`;
  const data = await httpGetJson(url);
  if (!data || !data.Data || !data.Data.Data)
    throw new Error("Invalid CryptoCompare data");
  const rows = data.Data.Data as Array<{ time: number; close: number }>;
  return rows.map((r) => ({
    date: new Date(r.time * 1000).toISOString().slice(0, 10),
    close: r.close,
  }));
}

export async function ensureHistoryForSymbol(
  symbol: string
): Promise<{ source: string; rows: Array<{ date: string; close: number }> }> {
  await openDb();
  const col = dailyPricesCollection();
  // Check cache first
  const cached = await col
    .find({ symbol }, { projection: { _id: 0, date: 1, close: 1 } })
    .sort({ date: 1 })
    .toArray();
  if (cached.length > 0) {
    return { source: "cache", rows: cached as any };
  }

  let history: Array<{ date: string; close: number }> | null = null;
  let source = "coingecko";
  const isCrypto = ["BTC", "TON"].includes(symbol.toUpperCase());
  if (isCrypto) {
    const sym = symbol.toUpperCase();
    const idCandidates =
      sym === "TON" ? ["toncoin", "the-open-network"] : [COINGECKO_IDS[sym]];
    for (const id of idCandidates) {
      try {
        history = await fetchCoinGeckoHistory(id);
        source = "coingecko";
        break;
      } catch (_) {}
    }
    if (!history) {
      try {
        history = await fetchBinanceKlines(sym);
        source = "binance";
      } catch (_) {}
    }
    if (!history) {
      history = await fetchCryptoCompareDaily(sym);
      source = "cryptocompare";
    }
  } else if (symbol.toUpperCase() === "SPY") {
    history = await fetchStooqDaily(symbol);
    source = "stooq";
  } else {
    throw new Error("Unsupported symbol");
  }

  await openDb();
  const col2 = dailyPricesCollection();
  const bulk = col2.initializeUnorderedBulkOp();
  for (const row of history) {
    bulk
      .find({ symbol, date: row.date })
      .upsert()
      .updateOne({
        $set: { symbol, date: row.date, close: row.close, source },
      });
  }
  await bulk.execute();
  const rows = await col2
    .find({ symbol }, { projection: { _id: 0, date: 1, close: 1 } })
    .sort({ date: 1 })
    .toArray();
  return { source, rows: rows as any };
}

// GET /api/market/crypto/:symbol/history?forceRefresh=false
router.get("/crypto/:symbol/history", async (req, res) => {
  const symbol = (req.params.symbol || "").toUpperCase();
  const forceRefresh = String(req.query.forceRefresh || "false") === "true";
  await openDb();
  const col = dailyPricesCollection();

  try {
    // if cache exists and not forcing refresh, return from cache
    if (!forceRefresh) {
      const rows = await col
        .find({ symbol }, { projection: { _id: 0, date: 1, close: 1 } })
        .sort({ date: 1 })
        .toArray();
      if (rows.length > 0) {
        return res.json({ symbol, source: "cache", rows });
      }
    }

    const { source, rows } = await ensureHistoryForSymbol(symbol);
    res.json({ symbol, source, rows });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || "Failed to load history" });
  }
});

export default router;
