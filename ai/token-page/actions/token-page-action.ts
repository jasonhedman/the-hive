import type { BaseAction, BaseActionResult, BaseActionSchemaAny } from "../../base-action";
import type { TokenChatData } from "@/types";

export type TokenPageActionSchemaAny = BaseActionSchemaAny;
export type TokenPageActionResult<TBody> = BaseActionResult<TBody>;

export interface TokenPageAction<TActionSchema extends TokenPageActionSchemaAny, TBody> extends BaseAction<TActionSchema, TBody, TokenChatData> {}