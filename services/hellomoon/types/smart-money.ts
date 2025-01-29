export enum Granularity {
  THIRTY_MIN = "THIRTY_MIN",
  ONE_HOUR = "ONE_HOUR", 
  SIX_HOUR = "SIX_HOUR",
  HALF_DAY = "HALF_DAY",
  ONE_DAY = "ONE_DAY",
  ONE_WEEK = "ONE_WEEK",
  ONE_MONTH = "ONE_MONTH"
}

export type SmartMoneyTokenInflow = {
  mint: string;
  name: string;
  symbol: string;
  decimals: number;
  totalHolders: number | null;
  programCount1d: number | null;
  latest_price: number | null;
  granularity: Granularity;
  priceChange: number | null;
  smartMoneyNetInflow: number | null;
  socialNetInflow: number | null;
  activeUsers: number | null;
  newUsers: number | null;
  buyers: number;
  sellers: number;
  volume: number | null;
  volumeChange: number;
};

export type SmartMoneyInflowsResponse = SmartMoneyTokenInflow[];