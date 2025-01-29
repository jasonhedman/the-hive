import { hellomoonPost } from "./base";

import type { TokenInfoResponse } from "./types";


export const getTokenInfo = async (mint: string) => {
    const response = await hellomoonPost<TokenInfoResponse>(`defi/fungible-token-info`, {
        mint: mint,
    });

    return response.length > 0 ? response[0] : null;
}