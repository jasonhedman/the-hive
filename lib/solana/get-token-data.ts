import { DexScreenerPair, DexScreenerResponse, JupiterTokenData } from "@/types";

export async function getTokenDataByAddress(
  mintAddress: string,
): Promise<JupiterTokenData | undefined> {
  try {
    if (!mintAddress) {
      throw new Error("Mint address is required");
    }

    const response = await fetch(`https://tokens.jup.ag/token/${mintAddress}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = (await response.json()) as JupiterTokenData | { message: string };

    function isErrorResponse(data: JupiterTokenData | { message: string }): data is { message: string } {
      return 'message' in data;
    }

    if (isErrorResponse(data)) {
      throw new Error(data.message);
    }

    return data as JupiterTokenData;
  } catch (error: any) {
    throw new Error(`Error fetching token data: ${error.message}`);
  }
}

export async function getTokenPairsFromAddress(
  mintAddress: string
): Promise<DexScreenerPair[] | null> {
  try {
    const response = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${mintAddress}`
    );
    const data: DexScreenerResponse = await response.json();

    if (!data.pairs || data.pairs.length === 0) {
      return null;
    }

    // Filter for Solana pairs only and sort by FDV
    const solanaPairs = data.pairs
      .filter((pair: any) => pair.chainId === "solana")
      .sort((a: any, b: any) => (b.volume?.h24 || 0) - (a.volume?.h24 || 0));

    return solanaPairs;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getTokenPairsFromTicker(
  ticker: string
): Promise<DexScreenerPair[] | null> {
  try {

    const response = await fetch(
      `https://api.dexscreener.com/latest/dex/search?q=${ticker.toLowerCase()}`
    );
    const data: DexScreenerResponse = await response.json();

    if (!data.pairs || data.pairs.length === 0) {
      return null;
    }

    // Filter for Solana pairs only and sort by FDV
    let solanaPairs = data.pairs
      .filter((pair: any) => pair.chainId === "solana")
      .sort((a: any, b: any) => (b.volume?.h24 || 0) - (a.volume?.h24 || 0));

    solanaPairs = solanaPairs.filter(
      (pair: any) =>
        pair.baseToken.symbol.toLowerCase() === ticker.toLowerCase()
    );

    if (solanaPairs.length === 0) {
      return null;
    }
    
    return solanaPairs;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getTokenDataAndPairByTicker(
  ticker: string
): Promise<{token: JupiterTokenData, pair: DexScreenerPair} | undefined> {
    try {
        if (!ticker) {
          throw new Error("Ticker is required");
        }
    
        const pairs = await getTokenPairsFromTicker(ticker);


        if (!pairs) {
            throw new Error("Token not found");
        }
    
        for (const pair of pairs) {
            const token = await getTokenDataByAddress(pair.baseToken.address);
            if (token) return {
                token: token,
                pair: pair
            };
        }

        throw new Error("Token not found");

      } catch (error: any) {
        throw new Error(`Error fetching token data: ${error.message}`);
    }
}

export const getTokenDataAndPairByAddress = async (
  mintAddress: string
): Promise<{token: JupiterTokenData, pair: DexScreenerPair} | undefined> => {
  const token = await getTokenDataByAddress(mintAddress);
  const pairs = await getTokenPairsFromAddress(mintAddress);
  if (!token || !pairs) return undefined;
  return {token, pair: pairs[0]};
}