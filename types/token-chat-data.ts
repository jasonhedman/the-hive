import type { TokenOverview } from "@/services/birdeye/types";

export type TokenChatData = Pick<TokenOverview, 
  'address' | 
  'name' | 
  'symbol' | 
  'decimals' | 
  'extensions' |
  'logoURI' |
  'supply' |
  'circulatingSupply'
>;