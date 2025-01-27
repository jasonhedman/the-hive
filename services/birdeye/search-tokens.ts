import { queryBirdeye } from "./base";

import type { SearchResponse } from "./types/search";

interface SearchTokensParams {
    keyword: string;
    verifyToken?: boolean;
    offset?: number;
    limit?: number;
}

export const searchTokens = async ({
    keyword,
    verifyToken,
    offset = 0,
    limit = 20
}: SearchTokensParams): Promise<SearchResponse> => {
    const params: Record<string, string | number> = {
        keyword,
        chain: "solana",
        target: "token",
        sort_by: "liquidity",
        sort_type: "desc",
        offset,
        limit
    };

    if (verifyToken !== undefined) {
        params.verify_token = verifyToken.toString();
    }

    return queryBirdeye<SearchResponse>('defi/v3/search', params);
} 