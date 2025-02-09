import { SolanaTokenPageTopHoldersAction } from "./top-holders";
import { TokenPageNumMentionsAction } from "./num-mentions";
import type { TokenPageAction, TokenPageActionSchemaAny } from "./token-page-action";
import { TokenChatData } from "@/types";

export function getAllTokenPageActions(extensions: TokenChatData['extensions']): TokenPageAction<TokenPageActionSchemaAny, any>[] {
  return [
    new SolanaTokenPageTopHoldersAction(),
    ...(extensions?.twitter ? [new TokenPageNumMentionsAction(extensions.twitter.split("/").pop()!)] : []),
  ];
}
export * from './types';

export * from './top-holders';
export * from './num-mentions';
export * from './liquidity';
export * from './price-analysis';