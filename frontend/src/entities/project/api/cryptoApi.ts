// API for fetching cryptocurrency prices
export interface CryptoPriceData {
  symbol: string;
  price: number;
  change24h: number;
  lastUpdated: string;
}

// Get current crypto price from CoinGecko API (free tier)
export async function getCurrentCryptoPrice(symbol: string): Promise<CryptoPriceData> {
  try {
    // Convert common symbols to CoinGecko IDs
    const symbolMap: Record<string, string> = {
      'BTC': 'bitcoin',
      'ETH': 'ethereum',
      'TON': 'the-open-network',
      'USDT': 'tether',
      'BNB': 'binancecoin',
      'SOL': 'solana',
      'ADA': 'cardano',
      'DOT': 'polkadot',
      'MATIC': 'polygon',
      'AVAX': 'avalanche-2',
    };

    const coinId = symbolMap[symbol.toUpperCase()] || symbol.toLowerCase();
    
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch price for ${symbol}`);
    }

    const data = await response.json();
    const coinData = data[coinId];

    if (!coinData) {
      throw new Error(`Price data not found for ${symbol}`);
    }

    return {
      symbol: symbol.toUpperCase(),
      price: coinData.usd,
      change24h: coinData.usd_24h_change || 0,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    throw error;
  }
}

