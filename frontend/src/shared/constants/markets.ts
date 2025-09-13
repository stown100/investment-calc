export enum MarketSymbol {
  BTC = "BTC",
  SPY = "SPY",
  TON = "TON",
}

export const MARKET_ALIASES: Record<MarketSymbol, string[]> = {
  [MarketSymbol.BTC]: ["BITCOIN", "BTC"],
  [MarketSymbol.SPY]: ["S&P", "SP500", "SPY"],
  [MarketSymbol.TON]: ["TON"],
};

export function detectSymbolFromName(
  name?: string | null
): MarketSymbol | null {
  if (!name) return null;
  const up = name.toUpperCase();
  for (const symbol of Object.values(MarketSymbol)) {
    const aliases = MARKET_ALIASES[symbol];
    if (aliases.some((a) => up.includes(a))) return symbol as MarketSymbol;
  }
  return null;
}
