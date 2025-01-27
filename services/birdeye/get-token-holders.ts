import { queryBirdeye } from "./base";

import type { TokenHoldersResponse } from "./types";

interface GetTokenHoldersParams {
    address: string;
    offset?: number;
    limit?: number;
}

export const getTokenHolders = async ({
    address,
    offset = 0,
    limit = 100
}: GetTokenHoldersParams): Promise<TokenHoldersResponse> => {
    return queryBirdeye<TokenHoldersResponse>(
        'defi/v3/token/holder',
        {
            address,
            offset,
            limit
        }
    );
} 