import { z } from "zod";

import { Connection } from "@solana/web3.js";

import { tool } from "ai";

import { getAllSolanaActions } from "./actions";

import type { SolanaAction, SolanaActionResult, SolanaActionSchemaAny } from "./actions";
import type { CoreTool } from "ai";

export const solanaTool = <TActionSchema extends SolanaActionSchemaAny, TResultBody>(
    action: SolanaAction<TActionSchema, TResultBody>, 
    connection: Connection
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
                ? await func(connection, args)
                : await (func as ((args: z.infer<TActionSchema>) => Promise<SolanaActionResult<TResultBody>>))(args);
            return result;
        }
    });
}

export const solanaTools = (connection: Connection, actions: SolanaAction<any, any>[] = getAllSolanaActions()) => actions.reduce((acc, action) => {
    acc[action.name] = solanaTool(action, connection);
    return acc;
}, {} as Record<string, CoreTool>);