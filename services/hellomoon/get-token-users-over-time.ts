import { hellomoonPost } from "./base";

import { TokenUsersOverTimeResponse } from "./types";

export const getTokenUsersOverTime = async (mint: string): Promise<TokenUsersOverTimeResponse> => {
    const response = await hellomoonPost<TokenUsersOverTimeResponse>("token/daily_active_users", {
        mint,
    });
    return response;
}