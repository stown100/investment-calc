import { Router } from "express";
import { openDb } from "./db";
import { ensureHistoryForSymbol } from "./market";

const router = Router();

function computeHistoricalForecast(
  rows: Array<{ date: string; close: number }>,
  years: number
) {
  if (!rows || rows.length < 2) {
    return {
      warning: "Not enough data",
      expectedTotalPercent: 0,
      expectedAnnualPercent: 0,
      p10: 0,
      p50: 0,
      p90: 0,
    };
  }
  // Convert to daily log returns
  const prices = rows.map((r) => r.close);
  const dates = rows.map((r) => r.date);
  const uniqueDates = new Set(dates);
  if (uniqueDates.size !== dates.length) {
    // ensure no duplicates
    const dedup: Record<string, number> = {} as any;
    rows.forEach((r) => (dedup[r.date] = r.close));
    const sorted = Object.entries(dedup)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, close]) => ({ date, close: Number(close) }));
    return computeHistoricalForecast(sorted, years);
  }

  const dailyReturns: number[] = [];
  for (let i = 1; i < prices.length; i++) {
    const r = Math.log(prices[i] / prices[i - 1]);
    dailyReturns.push(r);
  }

  // Rolling window CAGR for given years if enough history
  const daysInYear = 365; // calendar days, data is daily close
  const window = Math.round(daysInYear * years);
  const rollingCagr: number[] = [];
  if (rows.length > window) {
    for (let i = 0; i + window < rows.length; i++) {
      const start = rows[i].close;
      const end = rows[i + window].close;
      const cagr = Math.pow(end / start, 1 / years) - 1;
      if (isFinite(cagr)) rollingCagr.push(cagr);
    }
  }

  // Fallback to mean of daily returns if not enough window
  let expectedAnnual = 0;
  if (rollingCagr.length > 0) {
    rollingCagr.sort((a, b) => a - b);
    const p = (q: number) =>
      rollingCagr[Math.floor(q * (rollingCagr.length - 1))];
    const p10 = p(0.1);
    const p50 = p(0.5);
    const p90 = p(0.9);
    expectedAnnual = p50;
    return {
      expectedTotalPercent: (Math.pow(1 + expectedAnnual, years) - 1) * 100,
      expectedAnnualPercent: expectedAnnual * 100,
      p10: p10 * 100,
      p50: p50 * 100,
      p90: p90 * 100,
      method: "historical",
      samples: rollingCagr.length,
    };
  } else {
    const meanDaily =
      dailyReturns.reduce((s, x) => s + x, 0) / dailyReturns.length;
    expectedAnnual = Math.exp(meanDaily * daysInYear) - 1; // compound
    return {
      expectedTotalPercent: (Math.pow(1 + expectedAnnual, years) - 1) * 100,
      expectedAnnualPercent: expectedAnnual * 100,
      p10: NaN,
      p50: expectedAnnual * 100,
      p90: NaN,
      method: "historical-mean",
      samples: dailyReturns.length,
      warning:
        "Not enough continuous history for rolling window; using mean daily return",
    };
  }
}

function computeGbmForecast(
  rows: Array<{ date: string; close: number }>,
  years: number,
  simulations: number
) {
  if (!rows || rows.length < 2) {
    return {
      warning: "Not enough data",
      expectedTotalPercent: 0,
      expectedAnnualPercent: 0,
      p10: 0,
      p50: 0,
      p90: 0,
    };
  }
  // daily log returns
  const prices = rows.map((r) => r.close);
  const dailyReturns: number[] = [];
  for (let i = 1; i < prices.length; i++) {
    const r = Math.log(prices[i] / prices[i - 1]);
    if (isFinite(r)) dailyReturns.push(r);
  }
  if (dailyReturns.length < 10) {
    return {
      warning: "Not enough data",
      expectedTotalPercent: 0,
      expectedAnnualPercent: 0,
      p10: 0,
      p50: 0,
      p90: 0,
    };
  }
  const daysInYear = 365;
  const meanDaily =
    dailyReturns.reduce((s, x) => s + x, 0) / dailyReturns.length;
  const varianceDaily =
    dailyReturns.reduce((s, x) => s + Math.pow(x - meanDaily, 2), 0) /
    (dailyReturns.length - 1);
  const sigmaDaily = Math.sqrt(Math.max(varianceDaily, 0));
  const muDaily = meanDaily; // drift per day (log returns)

  const steps = Math.round(daysInYear * years);
  const start = prices[prices.length - 1];

  const outcomes: number[] = [];
  for (let n = 0; n < simulations; n++) {
    let logPrice = Math.log(start);
    for (let t = 0; t < steps; t++) {
      const z = boxMullerRandom();
      // GBM in log space: dln(S) = (mu - 0.5*sigma^2)dt + sigma*sqrt(dt)*z, with dt=1 day
      logPrice += muDaily - 0.5 * sigmaDaily * sigmaDaily + sigmaDaily * z;
    }
    const endPrice = Math.exp(logPrice);
    const totalReturn = endPrice / start - 1;
    const annualReturn = Math.pow(1 + totalReturn, 1 / years) - 1;
    outcomes.push(annualReturn);
  }
  outcomes.sort((a, b) => a - b);
  const p = (q: number) => outcomes[Math.floor(q * (outcomes.length - 1))];
  const p10 = p(0.1);
  const p50 = p(0.5);
  const p90 = p(0.9);
  const expectedAnnual = p50;
  return {
    expectedTotalPercent: (Math.pow(1 + expectedAnnual, years) - 1) * 100,
    expectedAnnualPercent: expectedAnnual * 100,
    p10: p10 * 100,
    p50: p50 * 100,
    p90: p90 * 100,
    method: "gbm",
    samples: outcomes.length,
    sigmaAnnual: sigmaDaily * Math.sqrt(daysInYear),
  };
}

function boxMullerRandom() {
  // Standard normal via Box-Muller
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// GET /api/forecast/crypto/:symbol?years=1&method=historical|gbm&simulations=10000
router.get("/crypto/:symbol", async (req, res) => {
  const symbol = (req.params.symbol || "").toUpperCase();
  const years = Math.max(
    1,
    Math.min(50, parseInt(String(req.query.years || "1")) || 1)
  );
  const method = String(req.query.method || "historical").toLowerCase();
  const simulations = Math.max(
    100,
    Math.min(
      100000,
      parseInt(String(req.query.simulations || "10000")) || 10000
    )
  );
  const db = await openDb();
  try {
    const rows = await db.all(
      "SELECT date, close FROM daily_prices WHERE symbol = ? ORDER BY date ASC",
      [symbol]
    );
    if (!rows || rows.length < 2) {
      try {
        const r = await ensureHistoryForSymbol(symbol);
        const rows2 = r.rows;
        if (rows2 && rows2.length > 1) {
          const result =
            method === "gbm"
              ? computeGbmForecast(rows2, years, simulations)
              : computeHistoricalForecast(rows2, years);
          return res.json({
            symbol,
            years,
            method: method === "gbm" ? "gbm" : "historical",
            ...result,
          });
        }
      } catch (_) {}
      return res
        .status(400)
        .json({
          error:
            "No cached data for symbol. Load history first via /api/market/crypto/:symbol/history",
        });
    }
    const result =
      method === "gbm"
        ? computeGbmForecast(rows, years, simulations)
        : computeHistoricalForecast(rows, years);
    res.json({
      symbol,
      years,
      method: method === "gbm" ? "gbm" : "historical",
      ...result,
    });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || "Failed to forecast" });
  }
});

export default router;
