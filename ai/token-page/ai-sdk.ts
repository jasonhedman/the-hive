import { z } from "zod";

import { tool } from "ai";

import { getAllTokenPageActions } from "./actions";

import type { TokenPageAction, TokenPageActionResult, TokenPageActionSchemaAny } from "./actions";
import type { CoreTool } from "ai";
import type { TokenChatData } from "@/types";

export const tokenPageTool = <TActionSchema extends TokenPageActionSchemaAny, TResultBody>(
    action: TokenPageAction<TActionSchema, TResultBody>, 
    token: TokenChatData
) => {
    if (!action.func) {
        return tool({
            description: action.description,
            parameters: action.argsSchema,
        });
    }
    const func = action.func;
    return tool({
        description: action.description,
        parameters: action.argsSchema,
        execute: async (args) => {
            const result = func.length === 2 
                ? await func(token, args)
                : await (func as ((args: z.infer<TActionSchema>) => Promise<TokenPageActionResult<TResultBody>>))(args);
            return result;
        }
    });
}

export const tokenPageTools = (token: TokenChatData, actions: TokenPageAction<any, any>[] = getAllTokenPageActions(token.extensions)) => actions.reduce((acc, action) => {
    acc[action.name] = tokenPageTool(action, token);
    return acc;
}, {} as Record<string, CoreTool>);