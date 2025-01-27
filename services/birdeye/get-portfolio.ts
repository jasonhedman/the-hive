import { chunkArray } from "@/lib/utils";
import { queryBirdeye } from "./base";

import { PortfolioResponse, Portfolio, PortfolioItem } from "./types";
import { getPrices } from "./get-prices";
import { getToken } from "@/db/services";

const parseAddress = (address: string) => {
  return address === "So11111111111111111111111111111111111111111" ? "So11111111111111111111111111111111111111112" : address;
}

export const getPortfolio = async (wallet: string): Promise<Portfolio> => {
  const response = await queryBirdeye<PortfolioResponse>(`v1/wallet/token_list`, { wallet });

  const prices = (await Promise.all(chunkArray(response.items.map(item => parseAddress(item.address)), 100).map(async (chunk) => {
    return await getPrices(chunk);
  }))).reduce((acc, curr) => ({ ...acc, ...curr }), {});
  
  const tokens = await Promise.all(response.items.map(async (item) => {
    return await getToken(parseAddress(item.address));
  }));

  const items: PortfolioItem[] = response.items.map((item, index) => {
    const token = tokens[index];
    return {
      ...item,
      priceUsd: prices[parseAddress(item.address)]?.value ?? 0,
      valueUsd: item.uiAmount * (prices[parseAddress(item.address)]?.value ?? 0),
      name: token?.name ?? 'Unknown',
      symbol: token?.symbol ?? 'Unknown',
      logoURI: token?.logoURI ?? ''
    };
  }).sort((a, b) => b.valueUsd - a.valueUsd);

  return {
    wallet,
    totalUsd: items.reduce((acc, curr) => acc + curr.valueUsd, 0),
    items
  };
}