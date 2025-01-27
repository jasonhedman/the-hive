import { queryBirdeye } from "./base";

import { TokenMetadata } from "./types";

export const getTokenMetadata = async (address: string): Promise<TokenMetadata> => {
    return queryBirdeye<TokenMetadata>(
        'defi/v3/token/meta-data/single',
        { address }
    );
} 