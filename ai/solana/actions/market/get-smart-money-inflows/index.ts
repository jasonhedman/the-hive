import { SOLANA_GET_SMART_MONEY_INFLOWS_NAME } from "./name";
import { SOLANA_GET_SMART_MONEY_INFLOWS_PROMPT } from "./prompt";
import { GetSmartMoneyInflowsInputSchema } from "./input-schema";
import { getSmartMoneyInflows } from "./function";

import type { GetSmartMoneyInflowsResultBodyType } from "./types";
import type { SolanaAction } from "../../solana-action";

export class SolanaGetSmartMoneyInflowsAction implements SolanaAction<typeof GetSmartMoneyInflowsInputSchema, GetSmartMoneyInflowsResultBodyType> {
  public name = SOLANA_GET_SMART_MONEY_INFLOWS_NAME;
  public description = SOLANA_GET_SMART_MONEY_INFLOWS_PROMPT;
  public argsSchema = GetSmartMoneyInflowsInputSchema;
  public func = getSmartMoneyInflows;
} 